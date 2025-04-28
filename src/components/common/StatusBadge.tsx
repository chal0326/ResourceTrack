import React from 'react';

interface StatusBadgeProps {
  status: string;
  type: 'project' | 'milestone' | 'risk' | 'warning' | 'priority';
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, type }) => {
  const getStatusStyles = (): string => {
    if (type === 'project') {
      switch (status) {
        case 'planning':
          return 'bg-blue-100 text-blue-800';
        case 'in-progress':
          return 'bg-green-100 text-green-800';
        case 'on-hold':
          return 'bg-amber-100 text-amber-800';
        case 'completed':
          return 'bg-gray-100 text-gray-800';
        default:
          return 'bg-gray-100 text-gray-800';
      }
    } else if (type === 'milestone') {
      switch (status) {
        case 'pending':
          return 'bg-gray-100 text-gray-800';
        case 'in-progress':
          return 'bg-green-100 text-green-800';
        case 'completed':
          return 'bg-blue-100 text-blue-800';
        case 'delayed':
          return 'bg-red-100 text-red-800';
        default:
          return 'bg-gray-100 text-gray-800';
      }
    } else if (type === 'risk') {
      switch (status) {
        case 'identified':
          return 'bg-yellow-100 text-yellow-800';
        case 'mitigated':
          return 'bg-green-100 text-green-800';
        case 'resolved':
          return 'bg-blue-100 text-blue-800';
        case 'escalated':
          return 'bg-red-100 text-red-800';
        default:
          return 'bg-gray-100 text-gray-800';
      }
    } else if (type === 'warning') {
      switch (status) {
        case 'low':
          return 'bg-blue-100 text-blue-800';
        case 'medium':
          return 'bg-yellow-100 text-yellow-800';
        case 'high':
          return 'bg-orange-100 text-orange-800';
        case 'critical':
          return 'bg-red-100 text-red-800';
        default:
          return 'bg-gray-100 text-gray-800';
      }
    } else if (type === 'priority') {
      switch (status) {
        case 'low':
          return 'bg-gray-100 text-gray-800';
        case 'medium':
          return 'bg-blue-100 text-blue-800';
        case 'high':
          return 'bg-purple-100 text-purple-800';
        case 'critical':
          return 'bg-red-100 text-red-800';
        default:
          return 'bg-gray-100 text-gray-800';
      }
    }
    
    return 'bg-gray-100 text-gray-800';
  };

  return (
    <span className={`${getStatusStyles()} text-xs font-medium px-2.5 py-0.5 rounded-full`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export default StatusBadge;