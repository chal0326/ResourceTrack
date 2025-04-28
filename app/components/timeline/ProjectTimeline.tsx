import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import Card from '../common/Card';
import StatusBadge from '../common/StatusBadge';
import { PlusCircle, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';

const ProjectTimeline: React.FC = () => {
  const { 
    projects, 
    milestones, 
    getProjectMilestones, 
    getProjectById,
    activeProject,
    setActiveProject
  } = useData();
  
  const [expandedProjects, setExpandedProjects] = useState<Record<string, boolean>>({});
  
  // Helper to toggle project expansion
  const toggleProjectExpansion = (projectId: string) => {
    setExpandedProjects(prev => ({
      ...prev,
      [projectId]: !prev[projectId]
    }));
  };
  
  // Set the active project as expanded by default
  React.useEffect(() => {
    if (activeProject) {
      setExpandedProjects(prev => ({
        ...prev,
        [activeProject]: true
      }));
    }
  }, [activeProject]);
  
  // Calculate the project timespan in weeks
  const calculateTimespan = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffWeeks = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 7));
    return diffWeeks;
  };
  
  // Sort projects by start date
  const sortedProjects = [...projects].sort(
    (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  );
  
  // Get the earliest and latest dates across all projects
  const projectDates = sortedProjects.flatMap(project => [
    new Date(project.startDate),
    new Date(project.endDate)
  ]);
  
  const earliestDate = new Date(Math.min(...projectDates.map(date => date.getTime())));
  const latestDate = new Date(Math.max(...projectDates.map(date => date.getTime())));
  
  // Calculate the total timespan in weeks for the Gantt chart
  const totalTimespan = calculateTimespan(
    earliestDate.toISOString().split('T')[0],
    latestDate.toISOString().split('T')[0]
  );
  
  // Generate week labels for the Gantt chart
  const weekLabels = Array.from({ length: totalTimespan }, (_, i) => {
    const date = new Date(earliestDate);
    date.setDate(date.getDate() + i * 7);
    return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  });
  
  return (
    <Card title="Project Timeline">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-800">Timeline Overview</h3>
          <div className="flex items-center">
            <div className="flex items-center mr-4">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-1"></div>
              <span className="text-xs text-gray-600">In Progress</span>
            </div>
            <div className="flex items-center mr-4">
              <div className="w-3 h-3 bg-purple-500 rounded-full mr-1"></div>
              <span className="text-xs text-gray-600">Planned</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-gray-400 rounded-full mr-1"></div>
              <span className="text-xs text-gray-600">Completed</span>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            {/* Gantt Chart Header */}
            <div className="flex">
              <div className="w-64 flex-shrink-0"></div>
              <div className="flex-1 grid" style={{ gridTemplateColumns: `repeat(${totalTimespan}, minmax(40px, 1fr))` }}>
                {weekLabels.map((label, index) => (
                  <div key={index} className="text-xs text-gray-500 text-center border-r border-gray-200 py-1">
                    {label}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Gantt Chart Body */}
            <div className="border-t border-gray-200">
              {sortedProjects.map(project => {
                const projectTimespan = calculateTimespan(project.startDate, project.endDate);
                const offsetWeeks = calculateTimespan(
                  earliestDate.toISOString().split('T')[0],
                  project.startDate
                );
                
                const projectMilestones = getProjectMilestones(project.id);
                const isExpanded = expandedProjects[project.id] || false;
                
                return (
                  <div key={project.id} className="border-b border-gray-200">
                    {/* Project Row */}
                    <div 
                      className={`flex hover:bg-gray-50 cursor-pointer ${activeProject === project.id ? 'bg-blue-50' : ''}`}
                      onClick={() => toggleProjectExpansion(project.id)}
                    >
                      <div className="w-64 flex-shrink-0 p-3 flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-800">{project.name}</h4>
                          <div className="flex items-center mt-1">
                            <StatusBadge status={project.status} type="project" />
                            <span className="text-xs text-gray-500 ml-2">
                              {new Date(project.startDate).toLocaleDateString()} - {new Date(project.endDate).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </div>
                      <div className="flex-1 grid relative" style={{ gridTemplateColumns: `repeat(${totalTimespan}, minmax(40px, 1fr))` }}>
                        <div 
                          className={`absolute h-6 rounded-md mt-3 ${
                            project.status === 'completed' ? 'bg-gray-400' :
                            project.status === 'in-progress' ? 'bg-blue-500' : 'bg-purple-500'
                          }`}
                          style={{ 
                            left: `${(offsetWeeks / totalTimespan) * 100}%`,
                            width: `${(projectTimespan / totalTimespan) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                    
                    {/* Milestone Rows (when expanded) */}
                    {isExpanded && projectMilestones.map(milestone => {
                      const milestoneDate = new Date(milestone.dueDate);
                      const milestoneOffset = calculateTimespan(
                        earliestDate.toISOString().split('T')[0],
                        milestone.dueDate
                      );
                      
                      return (
                        <div key={milestone.id} className="flex hover:bg-gray-50">
                          <div className="w-64 flex-shrink-0 p-3 pl-8 flex items-center">
                            <ArrowRight size={12} className="text-gray-400 mr-2" />
                            <div>
                              <h5 className="text-sm text-gray-700">{milestone.name}</h5>
                              <div className="flex items-center mt-0.5">
                                <StatusBadge status={milestone.status} type="milestone" />
                                <span className="text-xs text-gray-500 ml-2">
                                  {new Date(milestone.dueDate).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex-1 grid relative" style={{ gridTemplateColumns: `repeat(${totalTimespan}, minmax(40px, 1fr))` }}>
                            <div 
                              className={`absolute h-4 w-4 rounded-full mt-4 ${
                                milestone.status === 'completed' ? 'bg-green-500' :
                                milestone.status === 'in-progress' ? 'bg-blue-500' :
                                milestone.status === 'delayed' ? 'bg-red-500' : 'bg-gray-400'
                              } ${milestone.isCriticalPath ? 'ring-2 ring-red-300' : ''}`}
                              style={{ 
                                left: `calc(${(milestoneOffset / totalTimespan) * 100}% - 8px)`,
                              }}
                            ></div>
                            {milestone.isCriticalPath && milestone.dependencies.length > 0 && (
                              <div className="absolute h-0.5 bg-red-300" style={{
                                left: `${((offsetWeeks + 0.5) / totalTimespan) * 100}%`,
                                width: `${((milestoneOffset - offsetWeeks - 0.5) / totalTimespan) * 100}%`,
                                top: '18px'
                              }}></div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      
      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg font-medium text-gray-800 mb-4">Dependencies & Critical Path</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {activeProject ? (
            <>
              <MilestoneList 
                projectId={activeProject} 
                title="Critical Path Milestones" 
                filter={(m) => m.isCriticalPath} 
              />
              <MilestoneList 
                projectId={activeProject} 
                title="All Milestones" 
                filter={() => true} 
              />
            </>
          ) : (
            <div className="col-span-2 p-8 text-center">
              <p className="text-gray-500 mb-4">Select a project to view detailed milestone information</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {projects.map(project => (
                  <button
                    key={project.id}
                    className="p-3 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-colors"
                    onClick={() => setActiveProject(project.id)}
                  >
                    <h4 className="font-medium text-gray-800 mb-1">{project.name}</h4>
                    <StatusBadge status={project.status} type="project" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

interface MilestoneListProps {
  projectId: string;
  title: string;
  filter: (milestone: any) => boolean;
}

const MilestoneList: React.FC<MilestoneListProps> = ({ projectId, title, filter }) => {
  const { milestones, getProjectMilestones } = useData();
  
  const projectMilestones = getProjectMilestones(projectId)
    .filter(filter)
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
  
  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <h4 className="text-sm font-medium text-gray-700 mb-3">{title}</h4>
      {projectMilestones.length > 0 ? (
        <ul className="space-y-3">
          {projectMilestones.map(milestone => {
            // Find dependent milestones
            const dependencies = milestone.dependencies.map(depId => 
              milestones.find(m => m.id === depId)
            ).filter(Boolean);
            
            return (
              <li key={milestone.id} className="p-2 bg-white rounded border border-gray-200">
                <div className="flex justify-between items-start">
                  <h5 className="font-medium text-gray-800">{milestone.name}</h5>
                  <StatusBadge status={milestone.status} type="milestone" />
                </div>
                <p className="text-xs text-gray-600 mt-1">{milestone.description}</p>
                <div className="mt-2 text-xs">
                  <span className="text-gray-500">Due: </span>
                  <span className="text-gray-700">{new Date(milestone.dueDate).toLocaleDateString()}</span>
                  
                  {milestone.dependencies.length > 0 && (
                    <div className="mt-1.5">
                      <span className="text-gray-500">Dependencies: </span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {dependencies.map((dep, idx) => (
                          dep && <span key={idx} className="inline-block px-2 py-0.5 text-xs bg-gray-100 text-gray-800 rounded">
                            {dep.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="text-sm text-gray-500 italic">No milestones match the criteria</p>
      )}
    </div>
  );
};

export default ProjectTimeline;