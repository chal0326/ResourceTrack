import React from 'react';

interface ProgressBarProps {
  value: number;
  max?: number;
  showLabel?: boolean;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  color?: 'blue' | 'green' | 'red' | 'yellow' | 'purple' | 'gray';
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  showLabel = true,
  label,
  size = 'md',
  color = 'blue'
}) => {
  const percentage = Math.min(Math.max(0, (value / max) * 100), 100);
  
  const getColorClasses = () => {
    switch (color) {
      case 'blue':
        return 'bg-blue-600';
      case 'green':
        return 'bg-green-600';
      case 'red':
        return 'bg-red-600';
      case 'yellow':
        return 'bg-yellow-500';
      case 'purple':
        return 'bg-purple-600';
      case 'gray':
        return 'bg-gray-500';
      default:
        return 'bg-blue-600';
    }
  };
  
  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'h-1.5';
      case 'md':
        return 'h-2.5';
      case 'lg':
        return 'h-4';
      default:
        return 'h-2.5';
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between mb-1">
        {label && <span className="text-sm font-medium text-gray-700">{label}</span>}
        {showLabel && <span className="text-sm font-medium text-gray-700">{percentage.toFixed(0)}%</span>}
      </div>
      <div className={`w-full bg-gray-200 rounded-full ${getSizeClasses()}`}>
        <div
          className={`${getColorClasses()} ${getSizeClasses()} rounded-full transition-all duration-300 ease-in-out`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;