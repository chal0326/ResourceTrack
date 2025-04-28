import React from 'react';
import { useData } from '../../context/DataContext';
import Card from '../common/Card';
import ProgressBar from '../common/ProgressBar';
import { DollarSign, TrendingUp, TrendingDown, BarChart } from 'lucide-react';

const BudgetSummary: React.FC = () => {
  const { projects, expenses } = useData();
  
  // Calculate overall budget metrics
  const totalBudget = projects.reduce((sum, project) => sum + project.budget, 0);
  const totalActualCost = projects.reduce((sum, project) => sum + project.actualCost, 0);
  const budgetUtilization = (totalActualCost / totalBudget) * 100;
  const budgetVariance = totalBudget - totalActualCost;
  const budgetVariancePercentage = (budgetVariance / totalBudget) * 100;
  
  // Group expenses by category
  const expensesByCategory = expenses.reduce((acc, expense) => {
    if (!acc[expense.category]) {
      acc[expense.category] = 0;
    }
    acc[expense.category] += expense.actualAmount;
    return acc;
  }, {} as Record<string, number>);
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Calculate percentages for each category
  const totalExpenses = Object.values(expensesByCategory).reduce((sum, amount) => sum + amount, 0);
  const categoryPercentages = Object.entries(expensesByCategory).map(([category, amount]) => ({
    category,
    amount,
    percentage: (amount / totalExpenses) * 100
  })).sort((a, b) => b.amount - a.amount);
  
  return (
    <Card title="Budget Summary">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <SummaryMetric
          title="Total Budget"
          value={formatCurrency(totalBudget)}
          icon={<DollarSign className="h-5 w-5 text-blue-600" />}
        />
        <SummaryMetric
          title="Actual Cost to Date"
          value={formatCurrency(totalActualCost)}
          subtitle={`${budgetUtilization.toFixed(1)}% of total budget`}
          icon={<BarChart className="h-5 w-5 text-green-600" />}
        />
        <SummaryMetric
          title="Budget Variance"
          value={formatCurrency(budgetVariance)}
          subtitle={`${Math.abs(budgetVariancePercentage).toFixed(1)}% ${budgetVariance >= 0 ? 'under' : 'over'} budget`}
          trend={budgetVariance >= 0 ? 'positive' : 'negative'}
          icon={budgetVariance >= 0 ? 
            <TrendingDown className="h-5 w-5 text-green-600" /> : 
            <TrendingUp className="h-5 w-5 text-red-600" />
          }
        />
        <SummaryMetric
          title="Remaining Budget"
          value={formatCurrency(budgetVariance > 0 ? budgetVariance : 0)}
          subtitle={budgetVariance > 0 ? 
            `${budgetVariancePercentage.toFixed(1)}% remaining` : 
            'Budget exceeded'
          }
          trend={budgetVariance > 0 ? 'positive' : 'negative'}
          icon={<DollarSign className="h-5 w-5 text-purple-600" />}
        />
      </div>
      
      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg font-medium text-gray-800 mb-4">Expense Breakdown</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            {categoryPercentages.map(({ category, amount, percentage }) => (
              <div key={category} className="mb-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-gray-700">
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </span>
                  <span className="text-sm font-medium text-gray-700">
                    {formatCurrency(amount)} ({percentage.toFixed(1)}%)
                  </span>
                </div>
                <ProgressBar 
                  value={percentage} 
                  color={
                    category === 'labor' ? 'blue' :
                    category === 'software' ? 'green' :
                    category === 'hardware' ? 'purple' :
                    category === 'vendor' ? 'yellow' : 'gray'
                  }
                  showLabel={false}
                  size="sm"
                />
              </div>
            ))}
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Project Budget Utilization</h4>
            {projects.map(project => {
              const utilization = (project.actualCost / project.budget) * 100;
              return (
                <div key={project.id} className="mb-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-700">{project.name}</span>
                    <span className="text-xs font-medium text-gray-500">
                      {utilization.toFixed(0)}%
                    </span>
                  </div>
                  <ProgressBar 
                    value={utilization} 
                    max={100}
                    color={
                      utilization > 100 ? 'red' :
                      utilization > 85 ? 'yellow' :
                      'green'
                    }
                    showLabel={false}
                    size="sm"
                  />
                  <div className="flex justify-between items-center mt-0.5 text-xs text-gray-500">
                    <span>{formatCurrency(project.actualCost)}</span>
                    <span>{formatCurrency(project.budget)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Card>
  );
};

interface SummaryMetricProps {
  title: string;
  value: string;
  subtitle?: string;
  trend?: 'positive' | 'negative';
  icon: React.ReactNode;
}

const SummaryMetric: React.FC<SummaryMetricProps> = ({ 
  title, 
  value, 
  subtitle, 
  trend,
  icon 
}) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-gray-500 text-xs font-medium uppercase mb-1">{title}</h3>
          <p className="text-gray-900 text-xl font-semibold">{value}</p>
          {subtitle && (
            <p className={`text-xs mt-1 ${
              trend === 'positive' ? 'text-green-600' : 
              trend === 'negative' ? 'text-red-600' : 
              'text-gray-500'
            }`}>
              {subtitle}
            </p>
          )}
        </div>
        <div className="p-2 rounded-full bg-gray-50">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default BudgetSummary;