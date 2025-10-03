import { useState, useEffect, useCallback } from 'react';
import { ReviewService, Review } from '../lib/supabase';

interface UsePollingReviewsOptions {
  interval?: number; // Polling interval in milliseconds (default: 30000 = 30 seconds)
  enabled?: boolean; // Whether polling is enabled (default: true)
}

export function usePollingReviews(options: UsePollingReviewsOptions = {}) {
  const { interval = 30000, enabled = true } = options;
  const [reviews, setReviews] = useState<Review[]>([]);
  const [allReviews, setAllReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // Fetch data function
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
      setLastUpdated(new Date());
    } catch (err) {
      console.error('Error fetching reviews:', err);
      setError('Failed to load reviews. Please check your Supabase configuration.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Initial fetch
    fetchData();

    // Set up polling interval
    let intervalId: NodeJS.Timeout;
    
    if (enabled) {
      intervalId = setInterval(fetchData, interval);
    }

    // Cleanup on unmount or when dependencies change
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [fetchData, interval, enabled]);

  return {
    reviews,
    allReviews,
    loading,
    error,
    lastUpdated,
    refetch: fetchData,
    isPolling: enabled
  };
}
