import React from 'react';
import { useData } from '../../context/DataContext';
import Card from '../common/Card';
import { Calendar, AlertTriangle, CheckCircle, TrendingUp } from 'lucide-react';

const WeeklyUpdate: React.FC = () => {
  const { weeklyUpdates } = useData();
  
  // Sort updates by date (newest first)
  const sortedUpdates = [...weeklyUpdates].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  return (
    <Card title="Weekly Updates">
      <div className="space-y-6">
        {sortedUpdates.map(update => (
          <div key={update.id} className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-blue-50 p-4 flex items-center justify-between">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-blue-600 mr-2" />
                <h3 className="font-medium text-gray-800">{update.week}</h3>
              </div>
              <span className="text-sm text-gray-500">
                {new Date(update.date).toLocaleDateString()}
              </span>
            </div>
            
            <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <UpdateSection 
                title="Highlights" 
                items={update.highlights} 
                icon={<CheckCircle className="h-5 w-5 text-green-600" />}
                className="bg-green-50"
              />
              
              <UpdateSection 
                title="Issues" 
                items={update.issues} 
                icon={<AlertTriangle className="h-5 w-5 text-red-600" />}
                className="bg-red-50"
              />
              
              <UpdateSection 
                title="Recommendations" 
                items={update.recommendations} 
                icon={<TrendingUp className="h-5 w-5 text-purple-600" />}
                className="bg-purple-50"
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

interface UpdateSectionProps {
  title: string;
  items: string[];
  icon: React.ReactNode;
  className?: string;
}

const UpdateSection: React.FC<UpdateSectionProps> = ({ title, items, icon, className }) => {
  return (
    <div className={`p-4 rounded-lg ${className}`}>
      <div className="flex items-center mb-3">
        {icon}
        <h4 className="font-medium text-gray-800 ml-2">{title}</h4>
      </div>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-start">
            <span className="text-gray-400 mr-2 mt-0.5">•</span>
            <span className="text-sm text-gray-700">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WeeklyUpdate;