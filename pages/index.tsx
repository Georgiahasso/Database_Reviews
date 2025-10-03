import React, { useState } from 'react';
import { KPICard } from '../components/KPICard';
import { RatingDistributionChart } from '../components/charts/RatingDistributionChart';
import { RatingTrendChart } from '../components/charts/RatingTrendChart';
import { VolumeTrendChart } from '../components/charts/VolumeTrendChart';
import { ReplyRateChart } from '../components/charts/ReplyRateChart';
import { AdReadyReviews } from '../components/AdReadyReviews';
import { HelpfulReviewsTable } from '../components/HelpfulReviewsTable';
import { 
  useReviewMetrics, 
  useRatingDistribution, 
  useRatingTrend, 
  useVolumeTrend,
  useAdReadyReviews,
  useTopHelpfulReviews
} from '../hooks/useReviewMetrics';
import { useRealTimeReviews } from '../hooks/useRealTimeReviews';
import { Review } from '../lib/supabase';

export default function Dashboard() {
  const [timeRange, setTimeRange] = useState('90');
  
  // Use real-time data hook
  const { reviews, allReviews, loading, error, isConnected, refetch } = useRealTimeReviews();

  // Calculate metrics using custom hooks
  const metrics = useReviewMetrics(allReviews, parseInt(timeRange));
  const ratingDistribution = useRatingDistribution(metrics.filteredReviews);
  const ratingTrend = useRatingTrend(allReviews);
  const volumeTrend = useVolumeTrend(allReviews);
  const adReadyReviews = useAdReadyReviews(metrics.filteredReviews);
  const topHelpfulReviews = useTopHelpfulReviews(metrics.filteredReviews);

  // Reply distribution for pie chart
  const replyData = [
    { name: 'With Reply', value: metrics.withReplies, color: '#10b981' },
    { name: 'No Reply', value: metrics.totalReviews - metrics.withReplies, color: '#ef4444' }
  ];

  // Mock data fallback function
  function getMockReviews(): Review[] {
    return [
      { id: 1, posted_at: '2025-09-28', rating: 5, body: 'Absolutely amazing product! The quality exceeded my expectations and the customer service was phenomenal. I would highly recommend this to anyone.', has_reply: true, helpful_count: 24, developer_reply: 'Thank you so much for your feedback! We\'re thrilled to hear you love it.' },
      { id: 2, posted_at: '2025-09-27', rating: 4, body: 'Very good overall. There are a few minor things I would improve, but nothing major. Solid purchase and worth the money.', has_reply: true, helpful_count: 18, developer_reply: 'Thanks for the suggestions! We\'re working on improvements.' },
      { id: 3, posted_at: '2025-09-26', rating: 5, body: 'Best purchase I\'ve made all year! The attention to detail is incredible and it works flawlessly. Can\'t imagine going back.', has_reply: true, helpful_count: 31, developer_reply: 'We appreciate your support! Thanks for being a great customer.' },
      { id: 4, posted_at: '2025-09-25', rating: 3, body: 'It\'s okay. Does the job but nothing special.', has_reply: false, helpful_count: 5, developer_reply: null },
      { id: 5, posted_at: '2025-09-24', rating: 4, body: 'Pretty happy with this. Does what it says on the tin and the setup was straightforward. Customer support was helpful when I had questions.', has_reply: true, helpful_count: 12, developer_reply: 'Glad we could help! Let us know if you need anything else.' },
    ];
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">📊 Review Performance Story</h1>
              <div className="flex items-center gap-4">
                <p className="text-gray-600">Understanding customer feedback through data-driven insights</p>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                  <span className="text-xs text-gray-500">
                    {isConnected ? 'Live' : 'Disconnected'}
                  </span>
                </div>
              </div>
              {error && (
                <div className="mt-2 p-3 bg-yellow-100 border border-yellow-400 rounded-md">
                  <p className="text-sm text-yellow-800">
                    ⚠️ {error} Using mock data for demonstration.
                  </p>
                </div>
              )}
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={refetch}
                className="px-3 py-2 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md transition-colors"
                title="Refresh data"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
              <select 
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="30">Last 30 Days</option>
                <option value="60">Last 60 Days</option>
                <option value="90">Last 90 Days</option>
              </select>
            </div>
          </div>
        </div>

        {/* Chapter 1: The Big Picture - Top KPIs */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">📈 Chapter 1: How Are We Doing Overall?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <KPICard
              question="How are customers rating us?"
              value={metrics.avgRating}
              subtitle="Average rating out of 5.0"
              status={metrics.avgRating >= 4 ? 'success' : metrics.avgRating >= 3 ? 'warning' : 'danger'}
              icon={
                <svg className="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              }
            />
            <KPICard
              question="Are we engaging with customers?"
              value={`${metrics.replyRate}%`}
              subtitle={`${metrics.withReplies} of ${metrics.totalReviews} reviews have replies`}
              status={metrics.replyRate >= 70 ? 'success' : metrics.replyRate >= 50 ? 'warning' : 'danger'}
              icon={
                <svg className="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                </svg>
              }
            />
            <KPICard
              question="How much feedback are we getting?"
              value={metrics.totalReviews}
              subtitle="Total reviews in selected period"
              status="neutral"
              icon={
                <svg className="w-6 h-6 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                  <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                </svg>
              }
            />
          </div>
        </div>

        {/* Chapter 2: Rating Insights */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">⭐ Chapter 2: Understanding Our Ratings</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RatingDistributionChart data={ratingDistribution} />
            <RatingTrendChart data={ratingTrend} />
          </div>
        </div>

        {/* Chapter 3: Engagement Metrics */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">💬 Chapter 3: Are We Engaging With Customers?</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <VolumeTrendChart data={volumeTrend} />
            <ReplyRateChart data={replyData} />
          </div>
        </div>

        {/* Chapter 4: Marketing Opportunities */}
        <AdReadyReviews reviews={adReadyReviews} />

        {/* Chapter 5: Most Helpful Reviews */}
        <HelpfulReviewsTable reviews={topHelpfulReviews} />

      </div>
    </div>
  );
}
