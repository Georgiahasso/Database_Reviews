-- Enable real-time for Supabase tables
-- Run these commands in your Supabase SQL editor

-- Enable real-time for the reviews table
ALTER PUBLICATION supabase_realtime ADD TABLE review;

-- Enable real-time for the review_replies table (if it exists)
-- ALTER PUBLICATION supabase_realtime ADD TABLE review_replies;

-- Optional: Create a publication if it doesn't exist
-- CREATE PUBLICATION supabase_realtime FOR TABLE review;

-- Verify real-time is enabled
SELECT schemaname, tablename, hasindexes, hasrules, hastriggers 
FROM pg_tables 
WHERE tablename IN ('review', 'review_replies');

-- Check publications
SELECT * FROM pg_publication WHERE pubname = 'supabase_realtime';

-- Test real-time subscription (this will show in your dashboard)
-- INSERT INTO review (posted_at, rating, body, author) 
-- VALUES (CURRENT_DATE, 5, 'Test real-time review!', 'Test User');
