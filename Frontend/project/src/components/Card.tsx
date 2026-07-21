import React from 'react';
import { DivideIcon as LucideIcon, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface CardProps {
  title: string;
  icon?: LucideIcon;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export default function Card({ title, icon: Icon, action, children, className = '' }: CardProps) {
  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-200 ${className}`}>
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {Icon && (
              <div className="p-2 bg-blue-100 rounded-lg">
                <Icon className="h-5 w-5 text-blue-600" />
              </div>
            )}
            <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          </div>
          {action && <div>{action}</div>}
        </div>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}

interface StatsCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  className?: string;
}

export function StatsCard({ title, value, icon: Icon, trend = 'neutral', trendValue, className = '' }: StatsCardProps) {
  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      default:
        return <Minus className="h-4 w-4 text-gray-400" />;
    }
  };

  const getTrendColor = () => {
    switch (trend) {
      case 'up':
        return 'text-green-600';
      case 'down':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-200 p-6 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-blue-100 rounded-lg">
          <Icon className="h-6 w-6 text-blue-600" />
        </div>
        {trendValue && (
          <div className={`flex items-center space-x-1 ${getTrendColor()}`}>
            {getTrendIcon()}
            <span className="text-sm font-medium">{trendValue}</span>
          </div>
        )}
      </div>
      <div>
        <p className="text-2xl font-bold text-gray-900 mb-1">{value}</p>
        <p className="text-sm text-gray-600">{title}</p>
      </div>
    </div>
  );
}