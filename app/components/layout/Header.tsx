import React from 'react';
import { Clock, BellIcon, Settings, HelpCircle, Search } from 'lucide-react';
import { useData } from '../../context/DataContext';

const Header: React.FC = () => {
  const { activeSection, setActiveSection } = useData();

  const formatDate = () => {
    const today = new Date();
    return today.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getSectionTitle = (section: string): string => {
    switch (section) {
      case 'dashboard': return 'Resource Dashboard';
      case 'personnel': return 'Personnel Allocation';
      case 'timeline': return 'Project Timeline';
      case 'budget': return 'Budget Monitoring';
      case 'risks': return 'Risk Assessment';
      case 'reports': return 'Weekly Reports';
      default: return 'Resource Dashboard';
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <h1 className="text-2xl font-semibold text-gray-800">
            {getSectionTitle(activeSection)}
          </h1>
        </div>

        <div className="flex items-center">
          <div className="relative mr-4">
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>

          <div className="flex items-center space-x-2 mr-6 text-gray-500">
            <Clock className="h-5 w-5" />
            <span className="text-sm">{formatDate()}</span>
          </div>

          <div className="flex items-center space-x-4">
            <button className="relative p-1 rounded-full hover:bg-gray-100 focus:outline-none">
              <BellIcon className="h-6 w-6 text-gray-500" />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
            </button>
            <button className="p-1 rounded-full hover:bg-gray-100 focus:outline-none">
              <HelpCircle className="h-6 w-6 text-gray-500" />
            </button>
            <button className="p-1 rounded-full hover:bg-gray-100 focus:outline-none">
              <Settings className="h-6 w-6 text-gray-500" />
            </button>

            <div className="flex items-center ml-4">
              <img
                src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100"
                alt="User Avatar"
                className="h-8 w-8 rounded-full border-2 border-blue-500"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;