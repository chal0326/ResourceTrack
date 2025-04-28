import React from 'react';
import { useData } from '../../context/DataContext';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  DollarSign, 
  AlertTriangle, 
  FileText, 
  Settings,
  LogOut,
  BarChart4
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const { activeSection, setActiveSection } = useData();

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'personnel', label: 'Personnel', icon: <Users size={20} /> },
    { id: 'timeline', label: 'Timeline', icon: <Calendar size={20} /> },
    { id: 'budget', label: 'Budget', icon: <DollarSign size={20} /> },
    { id: 'risks', label: 'Risks', icon: <AlertTriangle size={20} /> },
    { id: 'reports', label: 'Reports', icon: <FileText size={20} /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart4 size={20} /> },
  ];

  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center">
          <div className="bg-blue-600 text-white p-2 rounded-lg mr-2">
            <BarChart4 size={20} />
          </div>
          <div>
            <h2 className="font-bold text-lg text-gray-800">ResourceTrack</h2>
            <p className="text-xs text-gray-500">Revenue Cycle Management</p>
          </div>
        </div>
      </div>

      <nav className="flex-grow py-4">
        <ul>
          {navigationItems.map((item) => (
            <li key={item.id} className="px-2 py-1">
              <button
                onClick={() => setActiveSection(item.id)}
                className={`flex items-center w-full px-4 py-2.5 text-left rounded-lg transition-colors ${
                  activeSection === item.id
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span className={`${activeSection === item.id ? 'text-blue-600' : 'text-gray-500'} mr-3`}>
                  {item.icon}
                </span>
                <span className="font-medium">{item.label}</span>
                {item.id === 'risks' && (
                  <span className="ml-auto bg-red-100 text-red-800 text-xs font-medium px-2 py-0.5 rounded-full">
                    4
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3 mb-4">
          <button className="flex items-center w-full px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors">
            <Settings size={20} className="text-gray-500 mr-3" />
            <span className="font-medium">Settings</span>
          </button>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center w-full px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors">
            <LogOut size={20} className="text-gray-500 mr-3" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;