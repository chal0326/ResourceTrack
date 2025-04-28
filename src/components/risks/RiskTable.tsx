import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import Card from '../common/Card';
import StatusBadge from '../common/StatusBadge';
import { Search, Filter, ArrowUpDown } from 'lucide-react';

const RiskTable: React.FC = () => {
  const { risks, getProjectById } = useData();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<string>('impact');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };
  
  const getImpactValue = (impact: string) => {
    switch (impact) {
      case 'critical': return 3;
      case 'high': return 2;
      case 'medium': return 1;
      case 'low': return 0;
    }
  };
  
  const getProbabilityValue = (probability: string) => {
    switch (probability) {
      case 'high': return 2;
      case 'medium': return 1;
      case 'low': return 0;
    }
  };
  
  const getStatusValue = (status: string) => {
    switch (status) {
      case 'escalated': return 3;
      case 'identified': return 2;
      case 'mitigated': return 1;
      case 'resolved': return 0;
    }
  };
  
  const filteredRisks = risks.filter(risk => 
    risk.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    getProjectById(risk.projectId)?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    risk.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    risk.status.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const sortedRisks = [...filteredRisks].sort((a, b) => {
    let compareValueA: any;
    let compareValueB: any;
    
    switch (sortField) {
      case 'project':
        compareValueA = getProjectById(a.projectId)?.name || '';
        compareValueB = getProjectById(b.projectId)?.name || '';
        break;
      case 'category':
        compareValueA = a.category;
        compareValueB = b.category;
        break;
      case 'impact':
        compareValueA = getImpactValue(a.impact);
        compareValueB = getImpactValue(b.impact);
        break;
      case 'probability':
        compareValueA = getProbabilityValue(a.probability);
        compareValueB = getProbabilityValue(b.probability);
        break;
      case 'status':
        compareValueA = getStatusValue(a.status);
        compareValueB = getStatusValue(b.status);
        break;
      default:
        compareValueA = getImpactValue(a.impact);
        compareValueB = getImpactValue(b.impact);
    }
    
    if (typeof compareValueA === 'string') {
      const result = compareValueA.localeCompare(compareValueB);
      return sortDirection === 'asc' ? result : -result;
    } else {
      const result = compareValueB - compareValueA; // Higher values first
      return sortDirection === 'asc' ? -result : result;
    }
  });
  
  return (
    <Card title="Risk Assessment">
      <div className="mb-4 flex items-center">
        <div className="relative flex-1 mr-4">
          <input
            type="text"
            placeholder="Search risks..."
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
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button 
                  className="flex items-center focus:outline-none"
                  onClick={() => handleSort('project')}
                >
                  <span>Project</span>
                  {sortField === 'project' && (
                    <ArrowUpDown className="h-3 w-3 ml-1 text-gray-400" />
                  )}
                </button>
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button 
                  className="flex items-center focus:outline-none"
                  onClick={() => handleSort('category')}
                >
                  <span>Category</span>
                  {sortField === 'category' && (
                    <ArrowUpDown className="h-3 w-3 ml-1 text-gray-400" />
                  )}
                </button>
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button 
                  className="flex items-center focus:outline-none"
                  onClick={() => handleSort('impact')}
                >
                  <span>Impact</span>
                  {sortField === 'impact' && (
                    <ArrowUpDown className="h-3 w-3 ml-1 text-gray-400" />
                  )}
                </button>
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button 
                  className="flex items-center focus:outline-none"
                  onClick={() => handleSort('probability')}
                >
                  <span>Probability</span>
                  {sortField === 'probability' && (
                    <ArrowUpDown className="h-3 w-3 ml-1 text-gray-400" />
                  )}
                </button>
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button 
                  className="flex items-center focus:outline-none"
                  onClick={() => handleSort('status')}
                >
                  <span>Status</span>
                  {sortField === 'status' && (
                    <ArrowUpDown className="h-3 w-3 ml-1 text-gray-400" />
                  )}
                </button>
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Mitigation
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedRisks.map((risk) => {
              const project = getProjectById(risk.projectId);
              
              return (
                <tr key={risk.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4">
                    <div className="text-sm text-gray-900">{project?.name}</div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm text-gray-900 capitalize">{risk.category}</div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm text-gray-900">{risk.description}</div>
                  </td>
                  <td className="px-4 py-4">
                    <StatusBadge status={risk.impact} type="warning" />
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm text-gray-900 capitalize">{risk.probability}</div>
                  </td>
                  <td className="px-4 py-4">
                    <StatusBadge status={risk.status} type="risk" />
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm text-gray-600">
                      {risk.mitigation || "No mitigation plan defined"}
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

export default RiskTable;