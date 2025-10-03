import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface RatingDistributionChartProps {
  data: Array<{
    rating: string;
    count: number;
  }>;
}

export function RatingDistributionChart({ data }: RatingDistributionChartProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-1">What ratings are customers giving?</h3>
      <p className="text-sm text-gray-600 mb-4">Distribution of star ratings shows customer sentiment</p>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="rating" tick={{ fill: '#6b7280', fontSize: 12 }} />
          <YAxis allowDecimals={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '13px'
            }}
          />
          <Bar dataKey="count" fill="#3b82f6" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
