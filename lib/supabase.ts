import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const reviewsTable = process.env.NEXT_PUBLIC_REVIEWS_TABLE?.trim() || 'reviews'
const repliesTable = process.env.NEXT_PUBLIC_REPLIES_TABLE?.trim() || ''
const hasSeparateRepliesTable = Boolean(repliesTable && repliesTable !== reviewsTable)

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials not found. Please check your environment variables.')
  console.warn('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? 'Set' : 'Missing')
  console.warn('NEXT_PUBLIC_SUPABASE_ANON_KEY:', supabaseAnonKey ? 'Set' : 'Missing')
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co', 
  supabaseAnonKey || 'placeholder-key'
)

// Database table names
export const TABLES = {
  REVIEWS: reviewsTable,
  REPLIES: repliesTable
} as const

const buildSelectFields = () => {
  if (hasSeparateRepliesTable) {
    return `*, ${TABLES.REPLIES}(reply_text, created_at)`
  }
  return '*'
}

const normalizeReview = (review: any) => {
  if (hasSeparateRepliesTable) {
    const replies = ((review[TABLES.REPLIES] as any[]) || [])
    return {
      ...review,
      has_reply: replies.length > 0,
      developer_reply: replies[0]?.reply_text ?? null,
      helpful_count: review.helpful_count || 0
    }
  }

  return {
    ...review,
    has_reply: Boolean(review.developer_reply),
    developer_reply: review.developer_reply ?? null,
    helpful_count: review.helpful_count || 0
  }
}

// Types for our database
export interface Review {
  id: number
  posted_at: string
  rating: number
  body: string
  has_reply?: boolean
  helpful_count?: number
  developer_reply?: string | null
  created_at?: string
  updated_at?: string
  // Additional fields from your actual table
  app_id?: string
  author?: string
  developer_reply_posted_at?: string
}

export interface ReviewReply {
  id: number
  review_id: number
  reply_text: string
  created_at: string
  updated_at: string
}

// Real-time subscription types
export type ReviewSubscriptionCallback = (payload: any) => void;

// Database queries
export class ReviewService {
  static async getReviews(timeRangeDays: number = 90): Promise<Review[]> {
    const { data, error } = await supabase
      .from(TABLES.REVIEWS)
      .select(buildSelectFields())
      .order('id', { ascending: false })

    if (error) {
      console.error('Error fetching reviews:', error)
      throw error
    }

    // Transform the data to match our interface
    return (data as any[])?.map(normalizeReview) || []
  }

  static async getAllReviews(): Promise<Review[]> {
    const { data, error } = await supabase
      .from(TABLES.REVIEWS)
      .select(buildSelectFields())
      .order('id', { ascending: false })

    if (error) {
      console.error('Error fetching all reviews:', error)
      throw error
    }

    return (data as any[])?.map(normalizeReview) || []
  }

  static async addReview(review: Omit<Review, 'id' | 'created_at' | 'updated_at'>): Promise<Review> {
    const { data, error } = await supabase
      .from(TABLES.REVIEWS)
      .insert([review])
      .select()
      .single()

    if (error) {
      console.error('Error adding review:', error)
      throw error
    }

    return data
  }

  static async addReply(reviewId: number, replyText: string): Promise<ReviewReply> {
    if (!TABLES.REPLIES) {
      throw new Error('Replies table is not configured. Set NEXT_PUBLIC_REPLIES_TABLE to enable replies.')
    }

    const { data, error } = await supabase
      .from(TABLES.REPLIES)
      .insert([{ review_id: reviewId, reply_text: replyText }])
      .select()
      .single()

    if (error) {
      console.error('Error adding reply:', error)
      throw error
    }

    return data
  }

  // Real-time subscription methods
  static subscribeToReviews(callback: ReviewSubscriptionCallback) {
    return supabase
      .channel('reviews_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: TABLES.REVIEWS
        },
        callback
      )
      .subscribe()
  }

  static subscribeToReplies(callback: ReviewSubscriptionCallback) {
    if (!TABLES.REPLIES) {
      console.warn('Replies table not configured; skipping replies subscription.')
      return null
    }

    return supabase
      .channel('replies_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: TABLES.REPLIES
        },
        callback
      )
      .subscribe()
  }

  static unsubscribe(channel: any) {
    if (!channel) {
      return
    }

    return supabase.removeChannel(channel)
  }
}
