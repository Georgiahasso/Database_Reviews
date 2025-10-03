import React from 'react';
import { StarRating } from './StarRating';
import { Review } from '../lib/supabase';

interface AdReadyReviewsProps {
  reviews: Review[];
}

export function AdReadyReviews({ reviews }: AdReadyReviewsProps) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold text-gray-800 mb-4">🎯 Chapter 4: Which Reviews Should We Use For Marketing?</h2>
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <p className="text-sm text-gray-600 mb-4">High-rated, detailed reviews perfect for testimonials and advertising</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reviews.map((review) => (
            <div key={review.id} className="border-2 border-green-200 bg-green-50 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <StarRating rating={review.rating} />
              </div>
              <p className="text-sm text-gray-700 mb-3 line-clamp-3">&ldquo;{review.body}&rdquo;</p>
              <button className="w-full bg-green-600 text-white text-xs font-medium py-2 px-3 rounded hover:bg-green-700 transition-colors flex items-center justify-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Use in Ad Campaign
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
