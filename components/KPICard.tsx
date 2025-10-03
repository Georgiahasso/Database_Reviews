import React from 'react';

interface KPICardProps {
  question: string;
  value: string | number;
  subtitle: string;
  status: 'success' | 'warning' | 'danger' | 'neutral';
  icon: React.ReactNode;
  trend?: {
    positive: boolean;
    text: string;
  };
}

export function KPICard({ question, value, subtitle, status, icon, trend }: KPICardProps) {
  const statusColors = {
    success: 'border-green-400 bg-green-50',
    warning: 'border-yellow-400 bg-yellow-50',
    danger: 'border-red-400 bg-red-50',
    neutral: 'border-blue-400 bg-blue-50'
  };

  return (
    <div className={`rounded-lg border-l-4 p-5 bg-white shadow-sm ${statusColors[status]}`}>
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-sm font-semibold text-gray-700 leading-tight">{question}</h3>
        {icon}
      </div>
      <p className="text-3xl font-bold text-gray-900 mb-1">{value}</p>
      <p className="text-xs text-gray-600">{subtitle}</p>
      {trend && (
        <div className="mt-2 pt-2 border-t border-gray-200">
          <span className={`text-xs font-medium ${trend.positive ? 'text-green-600' : 'text-red-600'}`}>
            {trend.text}
          </span>
        </div>
      )}
    </div>
  );
}
