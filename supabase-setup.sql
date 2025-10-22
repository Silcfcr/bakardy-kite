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

-- Enable Row Level Security (RLS)
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access to approved reviews
CREATE POLICY "Public can view approved reviews" ON reviews
  FOR SELECT USING (approved = true);

-- Create policy for inserting new reviews (for future form submissions)
CREATE POLICY "Anyone can insert reviews" ON reviews
  FOR INSERT WITH CHECK (true);
