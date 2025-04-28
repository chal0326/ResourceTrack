import React from 'react';
import { useData } from '../../context/DataContext';
import Sidebar from './Sidebar';
import Header from './Header';
import Dashboard from '../dashboard/Dashboard';
import PersonnelTable from '../personnel/PersonnelTable';
import PersonnelDashboard from '../personnel/PersonnelDashboard';
import ProjectTimeline from '../timeline/ProjectTimeline';
import BudgetSummary from '../budget/BudgetSummary';
import ExpenseTable from '../budget/ExpenseTable';
import RiskTable from '../risks/RiskTable';
import WeeklyUpdate from '../reports/WeeklyUpdate';

const Layout: React.FC = () => {
  const { activeSection } = useData();

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'personnel':
        return (
          <div className="space-y-6">
            <PersonnelDashboard />
            <PersonnelTable />
          </div>
        );
      case 'timeline':
        return <ProjectTimeline />;
      case 'budget':
        return (
          <div className="space-y-6">
            <BudgetSummary />
            <ExpenseTable />
          </div>
        );
      case 'risks':
        return <RiskTable />;
      case 'reports':
        return <WeeklyUpdate />;
      case 'analytics':
        return (
          <div className="flex items-center justify-center p-8 bg-white rounded-xl border border-gray-200">
            <div className="text-center">
              <h2 className="text-xl font-medium text-gray-800 mb-2">Analytics Dashboard</h2>
              <p className="text-gray-500">Advanced analytics features coming soon!</p>
            </div>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <div className="flex-1 overflow-auto p-6">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default Layout;