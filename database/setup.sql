-- Supabase Database Setup for Review Dashboard
-- Run these commands in your Supabase SQL editor

-- Create reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id BIGSERIAL PRIMARY KEY,
  posted_at DATE NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  body TEXT NOT NULL,
  helpful_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create review_replies table
CREATE TABLE IF NOT EXISTS review_replies (
  id BIGSERIAL PRIMARY KEY,
  review_id BIGINT REFERENCES reviews(id) ON DELETE CASCADE,
  reply_text TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE review_replies ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (adjust based on your security needs)
CREATE POLICY "Allow public read access to reviews" ON reviews
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access to review_replies" ON review_replies
  FOR SELECT USING (true);

-- Optional: Allow inserts for testing (remove in production)
CREATE POLICY "Allow public insert access to reviews" ON reviews
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public insert access to review_replies" ON review_replies
  FOR INSERT WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_reviews_posted_at ON reviews(posted_at);
CREATE INDEX IF NOT EXISTS idx_reviews_rating ON reviews(rating);
CREATE INDEX IF NOT EXISTS idx_review_replies_review_id ON review_replies(review_id);

-- Insert sample data for testing
INSERT INTO reviews (posted_at, rating, body, helpful_count) VALUES
  ('2025-09-28', 5, 'Absolutely amazing product! The quality exceeded my expectations and the customer service was phenomenal. I would highly recommend this to anyone.', 24),
  ('2025-09-27', 4, 'Very good overall. There are a few minor things I would improve, but nothing major. Solid purchase and worth the money.', 18),
  ('2025-09-26', 5, 'Best purchase I''ve made all year! The attention to detail is incredible and it works flawlessly. Can''t imagine going back.', 31),
  ('2025-09-25', 3, 'It''s okay. Does the job but nothing special.', 5),
  ('2025-09-24', 4, 'Pretty happy with this. Does what it says on the tin and the setup was straightforward. Customer support was helpful when I had questions.', 12),
  ('2025-09-23', 5, 'Outstanding! From the packaging to the product itself, everything was top-notch. This company really cares about their customers.', 28),
  ('2025-09-22', 2, 'Not what I expected. Had some issues with setup and documentation was unclear.', 8),
  ('2025-09-21', 4, 'Great value for money. The features are impressive and it integrates well with my existing workflow. Would buy again.', 15),
  ('2025-09-20', 5, 'Couldn''t be happier! This has transformed the way I work. The interface is intuitive and the performance is stellar.', 22),
  ('2025-09-19', 1, 'Terrible experience. Broken on arrival and customer service was slow to respond.', 3);

-- Insert sample replies
INSERT INTO review_replies (review_id, reply_text) VALUES
  (1, 'Thank you so much for your feedback! We''re thrilled to hear you love it.'),
  (2, 'Thanks for the suggestions! We''re working on improvements.'),
  (3, 'We appreciate your support! Thanks for being a great customer.'),
  (5, 'Glad we could help! Let us know if you need anything else.'),
  (6, 'Thank you! Customer satisfaction is our priority.'),
  (9, 'So happy to hear this! Thanks for sharing your experience.'),
  (10, 'We sincerely apologize. Please contact us directly so we can make this right.');

-- Create a function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers to automatically update updated_at
CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON reviews
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_review_replies_updated_at BEFORE UPDATE ON review_replies
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
