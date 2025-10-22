-- Create reviews table
CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL,
  location VARCHAR(100),
  date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  approved BOOLEAN DEFAULT FALSE
);

-- Create an index for faster queries
CREATE INDEX idx_reviews_approved ON reviews(approved);
CREATE INDEX idx_reviews_created_at ON reviews(created_at);

-- Insert some sample reviews (optional)
INSERT INTO reviews (name, rating, comment, location, date, approved) VALUES
('Sarah Johnson', 5, 'Amazing experience! Bakar is an incredible instructor. Patient, knowledgeable, and made me feel safe throughout the entire process. I went from never kitesurfing to riding confidently in just 3 days!', 'El Gouna, Egypt', '2024-01-15', true),
('Mike Chen', 5, 'Best kitesurfing lesson I''ve ever had. Bakar''s teaching method is perfect for beginners. The equipment was top-notch and the location in El Gouna is ideal for learning.', 'El Gouna, Egypt', '2024-01-20', true),
('Emma Wilson', 5, 'Professional, safe, and fun! Bakar helped me progress from basic kite control to my first water starts. His walkie-talkie system is genius - I always felt connected and supported.', 'El Gouna, Egypt', '2024-02-10', true),
('David Rodriguez', 5, 'Incredible instructor with 14+ years of experience. Bakar made learning kitesurfing enjoyable and safe. The Red Sea conditions in El Gouna are perfect for beginners.', 'El Gouna, Egypt', '2024-02-25', true),
('Lisa Anderson', 5, 'Bakar is the best! His teaching approach is methodical and patient. I felt confident and safe throughout the entire learning process. Highly recommend!', 'El Gouna, Egypt', '2024-03-05', true),
('Tom Brown', 5, 'Outstanding instruction! Bakar''s expertise and teaching style made kitesurfing accessible and fun. The walkie-talkie communication system was incredibly helpful.', 'El Gouna, Egypt', '2024-03-18', true);

-- Enable Row Level Security (RLS)
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access to approved reviews
CREATE POLICY "Public can view approved reviews" ON reviews
  FOR SELECT USING (approved = true);

-- Create policy for inserting new reviews (for future form submissions)
CREATE POLICY "Anyone can insert reviews" ON reviews
  FOR INSERT WITH CHECK (true);

  ALTER TABLE public.reviews 
ADD COLUMN countryCode TEXT;
