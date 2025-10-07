import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  const reviewsTable = process.env.NEXT_PUBLIC_REVIEWS_TABLE || 'reviews'
  const repliesTable = process.env.NEXT_PUBLIC_REPLIES_TABLE || ''

  res.status(200).json({
    supabaseUrlPresent: Boolean(url),
    supabaseAnonKeyPresent: Boolean(anon),
    reviewsTable,
    repliesTable,
    nodeEnv: process.env.NODE_ENV,
  })
}


