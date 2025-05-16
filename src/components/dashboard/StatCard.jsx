import { cn } from '../../lib/utils';
import React from 'react';

const StatCard = ({ title, value, subtitle, icon, trend, className, onClick }) => {
  const getIconBackground = () => {
    // Determine icon background color based on title
    if (title.toLowerCase().includes('open')) return 'bg-garage-primary';
    if (title.toLowerCase().includes('completed')) return 'bg-garage-accent';
    if (title.toLowerCase().includes('low')) return 'bg-garage-danger';
    return 'bg-garage-primary';
  };

  return (
    <div
      className={cn('modern-card p-5 hover-scale animate-fade-slide-in', onClick && 'cursor-pointer', className)}
      onClick={onClick}
    >
      <div className='flex justify-between items-start'>
        <div>
          <h3 className='text-sm font-medium text-gray-500 mb-1'>{title}</h3>
          <div className='flex items-baseline'>
            <p className='text-2xl font-bold text-gray-900'>{value}</p>
          </div>
          {subtitle && <p className='mt-1 text-xs text-gray-600'>{subtitle}</p>}
          {trend !== undefined && (
            <div
              className={cn(
                'mt-2 text-xs flex items-center font-medium',
                trend >= 0 ? 'text-garage-accent' : 'text-garage-danger'
              )}
            >
              {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}% from last week
            </div>
          )}
        </div>
        <div className={cn('p-2 rounded-full', getIconBackground())}>{icon}</div>
      </div>
    </div>
  );
};

export default StatCard;
