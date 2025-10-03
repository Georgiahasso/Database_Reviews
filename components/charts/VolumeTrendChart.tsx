import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface VolumeTrendChartProps {
  data: Array<{
    month: string;
    count: number;
  }>;
}

export function VolumeTrendChart({ data }: VolumeTrendChartProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-1">Are we getting more reviews?</h3>
      <p className="text-sm text-gray-600 mb-4">Review volume growth indicates customer engagement</p>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="month" tick={{ fill: '#6b7280', fontSize: 12 }} />
          <YAxis allowDecimals={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '13px'
            }}
          />
          <Line 
            type="monotone" 
            dataKey="count" 
            stroke="#8b5cf6" 
            strokeWidth={3}
            dot={{ fill: '#8b5cf6', r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
