import React from 'react';
import { useData } from '../../context/DataContext';
import Card from '../common/Card';
import StatusBadge from '../common/StatusBadge';
import { Clock, Users, AlertTriangle, DollarSign } from 'lucide-react';

const DashboardSummary: React.FC = () => {
  const { 
    projects, 
    teamMembers, 
    assignments, 
    resourceWarnings 
  } = useData();
  
  // Calculate the total budget and actual costs across all projects
  const totalBudget = projects.reduce((sum, project) => sum + project.budget, 0);
  const totalActualCost = projects.reduce((sum, project) => sum + project.actualCost, 0);
  const budgetPercentage = (totalActualCost / totalBudget) * 100;
  
  // Calculate total team utilization
  const calculateTotalUtilization = () => {
    const totalCapacity = teamMembers.length * 100;
    const totalAllocation = assignments.reduce((sum, assignment) => sum + assignment.allocation, 0);
    return (totalAllocation / totalCapacity) * 100;
  };
  
  // Count critical and high severity warnings
  const criticalWarnings = resourceWarnings.filter(
    warning => warning.severity === 'critical' || warning.severity === 'high'
  ).length;

  const inProgressProjects = projects.filter(project => project.status === 'in-progress').length;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <SummaryCard
        title="Active Projects"
        value={inProgressProjects}
        total={projects.length}
        icon={<Clock className="h-6 w-6 text-blue-600" />}
        color="blue"
      />
      
      <SummaryCard
        title="Team Utilization"
        value={calculateTotalUtilization().toFixed(0)}
        suffix="%"
        icon={<Users className="h-6 w-6 text-green-600" />}
        color="green"
      />
      
      <SummaryCard
        title="Resource Warnings"
        value={criticalWarnings}
        total={resourceWarnings.length}
        icon={<AlertTriangle className="h-6 w-6 text-red-600" />}
        color="red"
      />
      
      <SummaryCard
        title="Budget Utilized"
        value={budgetPercentage.toFixed(0)}
        suffix="%"
        subtitle={`$${(totalActualCost / 1000).toFixed(0)}k of $${(totalBudget / 1000).toFixed(0)}k`}
        icon={<DollarSign className="h-6 w-6 text-purple-600" />}
        color="purple"
      />
    </div>
  );
};

interface SummaryCardProps {
  title: string;
  value: string | number;
  suffix?: string;
  total?: number;
  subtitle?: string;
  icon: React.ReactNode;
  color: 'blue' | 'green' | 'red' | 'purple' | 'yellow';
}

const SummaryCard: React.FC<SummaryCardProps> = ({ 
  title, 
  value, 
  suffix = '', 
  total, 
  subtitle,
  icon,
  color
}) => {
  const getColorClass = () => {
    switch (color) {
      case 'blue': return 'from-blue-50 to-blue-100';
      case 'green': return 'from-green-50 to-green-100';
      case 'red': return 'from-red-50 to-red-100';
      case 'purple': return 'from-purple-50 to-purple-100';
      case 'yellow': return 'from-yellow-50 to-yellow-100';
      default: return 'from-gray-50 to-gray-100';
    }
  };
  
  return (
    <div className={`rounded-xl shadow-sm border border-gray-200 bg-gradient-to-br ${getColorClass()} p-6`}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-gray-500 text-sm font-medium mb-1">{title}</h3>
          <div className="flex items-baseline">
            <span className="text-2xl font-bold text-gray-800">{value}{suffix}</span>
            {total && (
              <span className="ml-1 text-gray-500 text-sm">
                of {total}
              </span>
            )}
          </div>
          {subtitle && <p className="text-gray-500 text-xs mt-1">{subtitle}</p>}
        </div>
        <div className="p-2 rounded-full bg-white shadow-sm">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default DashboardSummary;