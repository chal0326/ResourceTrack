import React from 'react';
import { useData } from '../../context/DataContext';
import Card from '../common/Card';
import ProgressBar from '../common/ProgressBar';

const TeamUtilization: React.FC = () => {
  const { teamMembers, calculateMemberUtilization, getProjectById, getMemberAssignments } = useData();
  
  const getMemberUtilizationColor = (utilization: number) => {
    if (utilization > 90) return 'red';
    if (utilization > 70) return 'yellow';
    if (utilization > 30) return 'green';
    return 'blue';
  };
  
  // Sort team members by utilization (highest first)
  const sortedTeamMembers = [...teamMembers].sort(
    (a, b) => calculateMemberUtilization(b.id) - calculateMemberUtilization(a.id)
  );

  return (
    <Card 
      title="Team Utilization" 
      className="h-full"
      footer={
        <div className="text-sm text-right">
          <button className="text-blue-600 hover:text-blue-800 font-medium">
            View All Team Members
          </button>
        </div>
      }
    >
      <div className="space-y-5 max-h-[360px] overflow-y-auto">
        {sortedTeamMembers.map((member) => {
          const utilization = calculateMemberUtilization(member.id);
          const memberAssignments = getMemberAssignments(member.id);
          const topProjects = memberAssignments
            .sort((a, b) => b.allocation - a.allocation)
            .slice(0, 2)
            .map(assignment => {
              const project = getProjectById(assignment.projectId);
              return {
                name: project?.name || 'Unknown Project',
                allocation: assignment.allocation
              };
            });
          
          return (
            <div key={member.id} className="p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition duration-150">
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center">
                  <img
                    src={member.imageUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=random`}
                    alt={member.name}
                    className="w-10 h-10 rounded-full mr-3 object-cover"
                  />
                  <div>
                    <h3 className="font-medium text-gray-800">{member.name}</h3>
                    <p className="text-xs text-gray-500">{member.role}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-sm font-medium px-2.5 py-1 rounded-lg ${
                    utilization > 90 ? 'bg-red-100 text-red-800' :
                    utilization > 70 ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {utilization}% Allocated
                  </span>
                </div>
              </div>
              
              <ProgressBar
                value={utilization}
                color={getMemberUtilizationColor(utilization)}
                showLabel={false}
                size="sm"
              />
              
              <div className="mt-2 flex flex-wrap gap-2">
                {topProjects.map((project, idx) => (
                  <span key={idx} className="inline-flex items-center px-2 py-1 rounded-md bg-gray-100 text-xs">
                    {project.name} ({project.allocation}%)
                  </span>
                ))}
                
                <span className="inline-flex items-center px-2 py-1 rounded-md bg-blue-50 text-blue-700 text-xs">
                  {member.availability}% Available
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default TeamUtilization;