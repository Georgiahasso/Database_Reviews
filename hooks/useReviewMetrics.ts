import { useMemo } from 'react';
import { Review } from '../lib/supabase';

interface ReviewMetrics {
  avgRating: number;
  replyRate: number;
  withReplies: number;
  totalReviews: number;
  filteredReviews: Review[];
}

export function useReviewMetrics(reviews: Review[], timeRangeDays: number): ReviewMetrics {
  return useMemo(() => {
    // For now, let's not filter by date since the date format is inconsistent
    // TODO: Fix date parsing for your specific date format
    const filteredReviews = reviews; // Use all reviews for now
    
    const avgRating = filteredReviews.length > 0 
      ? Number((filteredReviews.reduce((sum, r) => sum + r.rating, 0) / filteredReviews.length).toFixed(1))
      : 0;
    
    const withReplies = filteredReviews.filter(r => r.has_reply).length;
    const replyRate = filteredReviews.length > 0 
      ? Number(((withReplies / filteredReviews.length) * 100).toFixed(0))
      : 0;

    return {
      avgRating,
      replyRate,
      withReplies,
      totalReviews: filteredReviews.length,
      filteredReviews
    };
  }, [reviews, timeRangeDays]);
}

export function useRatingDistribution(reviews: Review[]) {
  return useMemo(() => {
    return [1, 2, 3, 4, 5].map(rating => ({
      rating: `${rating} Star${rating !== 1 ? 's' : ''}`,
      count: reviews.filter(r => r.rating === rating).length,
    }));
  }, [reviews]);
}

export function useRatingTrend(reviews: Review[]) {
  return useMemo(() => {
    const monthlyData: Record<string, { ratings: number[]; month: string }> = {};
    
    reviews.forEach(review => {
      const date = new Date(review.posted_at);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = { ratings: [], month: monthKey };
      }
      monthlyData[monthKey].ratings.push(review.rating);
    });

    return Object.values(monthlyData)
      .map(data => ({
        month: new Date(data.month + '-01').toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        avgRating: (data.ratings.reduce((sum, r) => sum + r, 0) / data.ratings.length).toFixed(1)
      }))
      .sort((a, b) => new Date(a.month).getTime() - new Date(b.month).getTime());
  }, [reviews]);
}

export function useVolumeTrend(reviews: Review[]) {
  return useMemo(() => {
    const monthlyVolume: Record<string, number> = {};
    
    reviews.forEach(review => {
      const date = new Date(review.posted_at);
      const monthKey = new Date(date.getFullYear(), date.getMonth(), 1).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
      monthlyVolume[monthKey] = (monthlyVolume[monthKey] || 0) + 1;
    });

    return Object.entries(monthlyVolume)
      .map(([month, count]) => ({ month, count }))
      .sort((a, b) => new Date(a.month).getTime() - new Date(b.month).getTime());
  }, [reviews]);
}

export function useAdReadyReviews(reviews: Review[]) {
  return useMemo(() => {
    return reviews
      .filter(r => r.rating >= 4 && r.body.length > 50)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 6);
  }, [reviews]);
}

export function useTopHelpfulReviews(reviews: Review[]) {
  return useMemo(() => {
    return [...reviews]
      .sort((a, b) => b.rating - a.rating) // Sort by rating instead of helpful_count
      .slice(0, 5);
  }, [reviews]);
}
