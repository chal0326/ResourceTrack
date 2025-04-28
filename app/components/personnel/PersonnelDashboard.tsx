import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { format, differenceInDays, differenceInBusinessDays } from 'date-fns';
import { BarChart, Card, Title, Text } from '@tremor/react';
import {
  Calendar,
  Clock,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Filter,
  ArrowUpDown
} from 'lucide-react';
import StatusBadge from '../common/StatusBadge';
import ProgressBar from '../common/ProgressBar';

const PersonnelDashboard: React.FC = () => {
  const { projects, assignments, teamMembers, milestones } = useData();
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');
  const [dateRange, setDateRange] = useState<{ start: string; end: string }>({
    start: '',
    end: ''
  });

  // For demo purposes, we'll use the first team member
  const currentUser = teamMembers[0];
  
  // Get assignments for the current user
  const userAssignments = assignments.filter(a => a.memberId === currentUser.id);
  const userProjects = projects.filter(p => 
    userAssignments.some(a => a.projectId === p.id)
  );

  // Calculate performance metrics
  const calculateMetrics = () => {
    const completedProjects = userProjects.filter(p => p.status === 'completed');
    const onTimeProjects = completedProjects.filter(p => {
      const assignment = userAssignments.find(a => a.projectId === p.id);
      if (!assignment) return false;
      return new Date(p.endDate) <= new Date(assignment.endDate);
    });

    return {
      totalProjects: userProjects.length,
      completedProjects: completedProjects.length,
      onTimeDelivery: completedProjects.length ? 
        (onTimeProjects.length / completedProjects.length) * 100 : 0,
      averageCompletion: userProjects.reduce((acc, proj) => {
        const projectMilestones = milestones.filter(m => m.projectId === proj.id);
        const completed = projectMilestones.filter(m => m.status === 'completed').length;
        return acc + (completed / (projectMilestones.length || 1));
      }, 0) / userProjects.length * 100
    };
  };

  const metrics = calculateMetrics();

  // Filter projects based on selected filters
  const filteredProjects = userProjects.filter(project => {
    if (selectedStatus !== 'all' && project.status !== selectedStatus) return false;
    if (selectedPriority !== 'all' && project.priority !== selectedPriority) return false;
    if (dateRange.start && new Date(project.startDate) < new Date(dateRange.start)) return false;
    if (dateRange.end && new Date(project.endDate) > new Date(dateRange.end)) return false;
    return true;
  });

  // Calculate project timeline metrics
  const calculateTimelineMetrics = (project: any) => {
    const plannedDuration = differenceInBusinessDays(
      new Date(project.endDate),
      new Date(project.startDate)
    );
    const actualDuration = differenceInBusinessDays(
      new Date(),
      new Date(project.startDate)
    );
    
    return {
      plannedDuration,
      actualDuration: project.status === 'completed' ? actualDuration : null,
      efficiency: project.status === 'completed' ? 
        (plannedDuration / actualDuration) * 100 : null
    };
  };

  // Performance chart data
  const performanceData = [
    {
      metric: 'Projects Completed',
      value: metrics.completedProjects,
      total: metrics.totalProjects
    },
    {
      metric: 'On-Time Delivery',
      value: Math.round(metrics.onTimeDelivery),
      total: 100
    },
    {
      metric: 'Avg. Completion Rate',
      value: Math.round(metrics.averageCompletion),
      total: 100
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header with User Info */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center space-x-4">
          <img
            src={currentUser.imageUrl}
            alt={currentUser.name}
            className="w-16 h-16 rounded-full"
          />
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">{currentUser.name}</h1>
            <p className="text-gray-600">{currentUser.role}</p>
            <div className="flex gap-2 mt-2">
              {currentUser.skills.slice(0, 3).map((skill, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-4">
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <Title>Project Completion</Title>
          </div>
          <Text className="mt-2">{metrics.completedProjects} of {metrics.totalProjects} Projects</Text>
          <ProgressBar
            value={(metrics.completedProjects / metrics.totalProjects) * 100}
            color="green"
            className="mt-2"
          />
        </Card>

        <Card className="p-4">
          <div className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-blue-500" />
            <Title>On-Time Delivery</Title>
          </div>
          <Text className="mt-2">{Math.round(metrics.onTimeDelivery)}% Projects On Time</Text>
          <ProgressBar
            value={metrics.onTimeDelivery}
            color="blue"
            className="mt-2"
          />
        </Card>

        <Card className="p-4">
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-purple-500" />
            <Title>Avg. Completion Rate</Title>
          </div>
          <Text className="mt-2">{Math.round(metrics.averageCompletion)}% Average Progress</Text>
          <ProgressBar
            value={metrics.averageCompletion}
            color="purple"
            className="mt-2"
          />
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 bg-white p-4 rounded-lg border border-gray-200">
        <select
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          <option value="all">All Statuses</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="on-hold">On Hold</option>
          <option value="planning">Planning</option>
        </select>

        <select
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
          value={selectedPriority}
          onChange={(e) => setSelectedPriority(e.target.value)}
        >
          <option value="all">All Priorities</option>
          <option value="critical">Critical</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>

        <input
          type="date"
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
          value={dateRange.start}
          onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
        />

        <input
          type="date"
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
          value={dateRange.end}
          onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
        />
      </div>

      {/* Project Timeline */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Project Timeline</h2>
        </div>
        
        <div className="divide-y divide-gray-200">
          {filteredProjects.map(project => {
            const timelineMetrics = calculateTimelineMetrics(project);
            const assignment = userAssignments.find(a => a.projectId === project.id);
            const projectMilestones = milestones.filter(m => m.projectId === project.id);
            const completedMilestones = projectMilestones.filter(m => m.status === 'completed').length;
            const progress = (completedMilestones / (projectMilestones.length || 1)) * 100;
            
            return (
              <div key={project.id} className="p-4 hover:bg-gray-50">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-800">{project.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <StatusBadge status={project.status} type="project" />
                      <StatusBadge status={project.priority} type="priority" />
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">
                      {format(new Date(project.startDate), 'MMM d, yyyy')} - 
                      {format(new Date(project.endDate), 'MMM d, yyyy')}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      {timelineMetrics.plannedDuration} working days planned
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Progress</span>
                      <span className="text-gray-800 font-medium">{Math.round(progress)}%</span>
                    </div>
                    <ProgressBar
                      value={progress}
                      color={
                        project.status === 'completed' ? 'green' :
                        project.status === 'on-hold' ? 'yellow' :
                        progress < 25 ? 'red' :
                        progress < 75 ? 'blue' : 'green'
                      }
                    />
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-gray-50 p-3 rounded">
                      <div className="text-sm text-gray-600">Role</div>
                      <div className="font-medium text-gray-800">
                        {assignment?.role || 'Team Member'}
                      </div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded">
                      <div className="text-sm text-gray-600">Allocation</div>
                      <div className="font-medium text-gray-800">
                        {assignment?.allocation || 0}%
                      </div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded">
                      <div className="text-sm text-gray-600">Milestones</div>
                      <div className="font-medium text-gray-800">
                        {completedMilestones} of {projectMilestones.length}
                      </div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded">
                      <div className="text-sm text-gray-600">Time Efficiency</div>
                      <div className="font-medium text-gray-800">
                        {timelineMetrics.efficiency ? 
                          `${Math.round(timelineMetrics.efficiency)}%` : 
                          'In Progress'}
                      </div>
                    </div>
                  </div>

                  {/* Milestone Timeline */}
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Milestones</h4>
                    <div className="space-y-2">
                      {projectMilestones.map(milestone => (
                        <div key={milestone.id} className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${
                            milestone.status === 'completed' ? 'bg-green-500' :
                            milestone.status === 'in-progress' ? 'bg-blue-500' :
                            milestone.status === 'delayed' ? 'bg-red-500' :
                            'bg-gray-300'
                          }`} />
                          <div className="flex-1">
                            <div className="text-sm text-gray-800">{milestone.name}</div>
                            <div className="text-xs text-gray-500">
                              Due: {format(new Date(milestone.dueDate), 'MMM d, yyyy')}
                            </div>
                          </div>
                          <StatusBadge status={milestone.status} type="milestone" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PersonnelDashboard;