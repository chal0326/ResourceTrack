import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import Card from '../common/Card';
import ProgressBar from '../common/ProgressBar';
import { Search, Filter, SlidersHorizontal, ArrowUpDown } from 'lucide-react';

const PersonnelTable: React.FC = () => {
  const { teamMembers, calculateMemberUtilization, getProjectById, getMemberAssignments } = useData();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<string>('utilization');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };
  
  const filteredMembers = teamMembers.filter(member => 
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  const sortedMembers = [...filteredMembers].sort((a, b) => {
    let compareValueA: any;
    let compareValueB: any;
    
    switch (sortField) {
      case 'name':
        compareValueA = a.name;
        compareValueB = b.name;
        break;
      case 'role':
        compareValueA = a.role;
        compareValueB = b.role;
        break;
      case 'utilization':
        compareValueA = calculateMemberUtilization(a.id);
        compareValueB = calculateMemberUtilization(b.id);
        break;
      case 'availability':
        compareValueA = a.availability;
        compareValueB = b.availability;
        break;
      default:
        compareValueA = calculateMemberUtilization(a.id);
        compareValueB = calculateMemberUtilization(b.id);
    }
    
    if (typeof compareValueA === 'string') {
      const result = compareValueA.localeCompare(compareValueB);
      return sortDirection === 'asc' ? result : -result;
    } else {
      const result = compareValueA - compareValueB;
      return sortDirection === 'asc' ? result : -result;
    }
  });
  
  return (
    <Card title="Personnel Allocation">
      <div className="mb-4 flex items-center">
        <div className="relative flex-1 mr-4">
          <input
            type="text"
            placeholder="Search by name, role, or skills..."
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
        </div>
        <button className="px-3 py-2 border border-gray-300 rounded-lg flex items-center">
          <Filter className="h-4 w-4 text-gray-500 mr-2" />
          <span className="text-sm text-gray-700">Filter</span>
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-36">
                <button 
                  className="flex items-center focus:outline-none"
                  onClick={() => handleSort('name')}
                >
                  <span>Team Member</span>
                  {sortField === 'name' && (
                    <ArrowUpDown className="h-3 w-3 ml-1 text-gray-400" />
                  )}
                </button>
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button 
                  className="flex items-center focus:outline-none"
                  onClick={() => handleSort('role')}
                >
                  <span>Role</span>
                  {sortField === 'role' && (
                    <ArrowUpDown className="h-3 w-3 ml-1 text-gray-400" />
                  )}
                </button>
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Project Assignments
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-40">
                <button 
                  className="flex items-center focus:outline-none"
                  onClick={() => handleSort('utilization')}
                >
                  <span>Utilization</span>
                  {sortField === 'utilization' && (
                    <ArrowUpDown className="h-3 w-3 ml-1 text-gray-400" />
                  )}
                </button>
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-40">
                <button 
                  className="flex items-center focus:outline-none"
                  onClick={() => handleSort('availability')}
                >
                  <span>Available</span>
                  {sortField === 'availability' && (
                    <ArrowUpDown className="h-3 w-3 ml-1 text-gray-400" />
                  )}
                </button>
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Skills
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedMembers.map((member) => {
              const utilization = calculateMemberUtilization(member.id);
              const assignments = getMemberAssignments(member.id).map(assignment => ({
                project: getProjectById(assignment.projectId),
                allocation: assignment.allocation
              }));
              
              return (
                <tr key={member.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img 
                        src={member.imageUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=random`}
                        alt={member.name}
                        className="w-8 h-8 rounded-full object-cover" 
                      />
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">{member.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm text-gray-900">{member.role}</div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm text-gray-900">
                      {assignments.length > 0 ? (
                        <div className="flex flex-col space-y-1.5">
                          {assignments.map((assignment, idx) => (
                            <div key={idx} className="flex items-center">
                              <div className="w-3 h-3 rounded-full mr-2" style={{
                                backgroundColor: 
                                  idx === 0 ? '#4f46e5' : 
                                  idx === 1 ? '#0891b2' : 
                                  idx === 2 ? '#4338ca' : '#7c3aed'
                              }}></div>
                              <span>{assignment.project?.name} ({assignment.allocation}%)</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <span className="text-gray-500">No assignments</span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <ProgressBar 
                      value={utilization} 
                      color={utilization > 90 ? 'red' : utilization > 70 ? 'yellow' : 'green'} 
                      size="sm"
                      showLabel={false}
                    />
                    <div className="text-xs text-gray-500 mt-1">{utilization}% Allocated</div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm font-medium text-blue-600">{member.availability}%</div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-wrap gap-1">
                      {member.skills.slice(0, 3).map((skill, idx) => (
                        <span key={idx} className="inline-block px-2 py-0.5 text-xs bg-gray-100 text-gray-800 rounded">
                          {skill}
                        </span>
                      ))}
                      {member.skills.length > 3 && (
                        <span className="inline-block px-2 py-0.5 text-xs bg-gray-100 text-gray-500 rounded">
                          +{member.skills.length - 3}
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default PersonnelTable;