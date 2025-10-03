import { useState, useEffect, useCallback } from 'react';
import { ReviewService, Review } from '../lib/supabase';

export function useRealTimeReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [allReviews, setAllReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  // Fetch initial data
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [reviewsData, allReviewsData] = await Promise.all([
        ReviewService.getReviews(90),
        ReviewService.getAllReviews()
      ]);
      setReviews(reviewsData);
      setAllReviews(allReviewsData);
      setError(null);
    } catch (err) {
      console.error('Error fetching reviews:', err);
      setError('Failed to load reviews. Please check your Supabase configuration.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Handle real-time updates
  const handleRealtimeUpdate = useCallback(async () => {
    console.log('🔄 Real-time update detected, refreshing data...');
    await fetchData();
  }, [fetchData]);

  useEffect(() => {
    // Initial data fetch
    fetchData();

    // Set up real-time subscriptions
    const reviewsChannel = ReviewService.subscribeToReviews(handleRealtimeUpdate);
    const repliesChannel = ReviewService.subscribeToReplies(handleRealtimeUpdate);

    setIsConnected(true);

    // Cleanup subscriptions on unmount
    return () => {
      ReviewService.unsubscribe(reviewsChannel);
      ReviewService.unsubscribe(repliesChannel);
      setIsConnected(false);
    };
  }, [fetchData, handleRealtimeUpdate]);

  return {
    reviews,
    allReviews,
    loading,
    error,
    isConnected,
    refetch: fetchData
  };
}
