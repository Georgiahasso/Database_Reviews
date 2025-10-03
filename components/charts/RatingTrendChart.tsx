import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface RatingTrendChartProps {
  data: Array<{
    month: string;
    avgRating: string;
  }>;
}

export function RatingTrendChart({ data }: RatingTrendChartProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-1">Is our rating improving over time?</h3>
      <p className="text-sm text-gray-600 mb-4">Monthly average rating trend analysis</p>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="month" tick={{ fill: '#6b7280', fontSize: 12 }} />
          <YAxis domain={[0, 5]} tick={{ fill: '#6b7280', fontSize: 12 }} />
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
            dataKey="avgRating" 
            stroke="#10b981" 
            strokeWidth={3}
            dot={{ fill: '#10b981', r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
