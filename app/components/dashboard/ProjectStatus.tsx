import React from 'react';
import { useData } from '../../context/DataContext';
import Card from '../common/Card';
import StatusBadge from '../common/StatusBadge';
import ProgressBar from '../common/ProgressBar';

const ProjectStatus: React.FC = () => {
  const { projects, milestones, getProjectMilestones, setActiveProject, setActiveSection } = useData();
  
  const calculateProjectProgress = (projectId: string) => {
    const projectMilestones = getProjectMilestones(projectId);
    if (projectMilestones.length === 0) return 0;
    
    const completedMilestones = projectMilestones.filter(
      m => m.status === 'completed'
    ).length;
    
    return (completedMilestones / projectMilestones.length) * 100;
  };
  
  const sortedProjects = [...projects].sort((a, b) => {
    // Sort by status first (in-progress first, then planning, then others)
    const statusOrder = { 'in-progress': 0, 'planning': 1, 'on-hold': 2, 'completed': 3 };
    if (statusOrder[a.status] !== statusOrder[b.status]) {
      return statusOrder[a.status] - statusOrder[b.status];
    }
    
    // Then sort by priority
    const priorityOrder = { 'critical': 0, 'high': 1, 'medium': 2, 'low': 3 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  const handleProjectClick = (projectId: string) => {
    setActiveProject(projectId);
    setActiveSection('timeline');
  };
  
  return (
    <Card 
      title="Project Status" 
      className="h-full"
      footer={
        <div className="text-sm text-right">
          <button className="text-blue-600 hover:text-blue-800 font-medium">
            View All Projects
          </button>
        </div>
      }
    >
      <div className="space-y-6 max-h-[360px] overflow-y-auto">
        {sortedProjects.map((project) => {
          const progress = calculateProjectProgress(project.id);
          
          return (
            <div 
              key={project.id} 
              className="cursor-pointer hover:bg-gray-50 p-3 rounded-lg transition duration-150 border border-gray-100"
              onClick={() => handleProjectClick(project.id)}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium text-gray-800">{project.name}</h3>
                <div className="flex space-x-2">
                  <StatusBadge status={project.priority} type="priority" />
                  <StatusBadge status={project.status} type="project" />
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{project.description}</p>
              
              <ProgressBar 
                value={progress} 
                label="Progress" 
                color={
                  project.status === 'on-hold' ? 'yellow' :
                  project.status === 'completed' ? 'green' :
                  progress < 25 ? 'blue' :
                  progress < 75 ? 'purple' : 'green'
                }
              />
              
              <div className="mt-2 flex justify-between items-center text-xs text-gray-500">
                <span>Start: {new Date(project.startDate).toLocaleDateString()}</span>
                <span>Due: {new Date(project.endDate).toLocaleDateString()}</span>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default ProjectStatus;