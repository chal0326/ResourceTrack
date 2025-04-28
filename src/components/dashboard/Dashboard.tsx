import React from 'react';
import DashboardSummary from './DashboardSummary';
import ProjectStatus from './ProjectStatus';
import TeamUtilization from './TeamUtilization';
import AlertsPanel from './AlertsPanel';

const Dashboard: React.FC = () => {
  return (
    <div>
      <DashboardSummary />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <TeamUtilization />
        </div>
        <div className="lg:col-span-1">
          <ProjectStatus />
        </div>
        <div className="lg:col-span-1">
          <AlertsPanel />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;