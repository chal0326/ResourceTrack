import React from 'react';
import { useData } from '../../context/DataContext';
import Card from '../common/Card';
import StatusBadge from '../common/StatusBadge';
import { AlertTriangle } from 'lucide-react';

const AlertsPanel: React.FC = () => {
  const { resourceWarnings, getProjectById } = useData();
  
  // Sort warnings by severity
  const sortedWarnings = [...resourceWarnings].sort((a, b) => {
    const severityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
    return severityOrder[a.severity] - severityOrder[b.severity];
  });

  return (
    <Card 
      title="Resource Warnings" 
      className="h-full"
      footer={
        <div className="text-sm text-right">
          <button className="text-blue-600 hover:text-blue-800 font-medium">
            View All Warnings
          </button>
        </div>
      }
    >
      <div className="space-y-4 max-h-[360px] overflow-y-auto">
        {sortedWarnings.map((warning) => {
          const affectedProjectNames = warning.affectedProjects
            .map(id => getProjectById(id)?.name || 'Unknown Project')
            .join(', ');
            
          return (
            <div key={warning.id} className="flex items-start p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition duration-150">
              <div className={`p-2 rounded-full mr-3 ${
                warning.severity === 'critical' ? 'bg-red-100' : 
                warning.severity === 'high' ? 'bg-orange-100' : 
                warning.severity === 'medium' ? 'bg-yellow-100' : 'bg-blue-100'
              }`}>
                <AlertTriangle className={`h-5 w-5 ${
                  warning.severity === 'critical' ? 'text-red-600' : 
                  warning.severity === 'high' ? 'text-orange-600' : 
                  warning.severity === 'medium' ? 'text-yellow-600' : 'text-blue-600'
                }`} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h4 className="font-medium text-gray-800">{warning.type.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</h4>
                  <StatusBadge status={warning.severity} type="warning" />
                </div>
                <p className="text-sm text-gray-600 mt-1">{warning.description}</p>
                <div className="mt-2">
                  <span className="text-xs font-medium text-gray-500">Projects: </span>
                  <span className="text-xs text-gray-700">{affectedProjectNames}</span>
                </div>
                <p className="text-xs text-gray-600 mt-1.5 italic">
                  Recommendation: {warning.recommendation}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default AlertsPanel;