# Supabase Setup for Reviews

## 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Note down your project URL and anon key

## 2. Database Setup

Run the SQL script in `supabase-setup.sql` in your Supabase SQL editor:

```sql
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

-- Create indexes for performance
CREATE INDEX idx_reviews_approved ON reviews(approved);
CREATE INDEX idx_reviews_created_at ON reviews(created_at);

-- Enable Row Level Security
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Public can view approved reviews" ON reviews
  FOR SELECT USING (approved = true);

CREATE POLICY "Anyone can insert reviews" ON reviews
  FOR INSERT WITH CHECK (true);
```

## 3. Environment Variables

Create a `.env` file in your project root:

```
REACT_APP_SUPABASE_URL=your-supabase-project-url
REACT_APP_SUPABASE_ANON_KEY=your-supabase-anon-key
```

## 4. Sample Data

The SQL script includes sample reviews. You can add more through the Supabase dashboard or by inserting directly into the database.

## 5. Features

- ✅ **Real-time reviews** from Supabase database
- ✅ **Star ratings** (1-5 stars)
- ✅ **Location and date** information
- ✅ **Approval system** (only approved reviews show)
- ✅ **Responsive design** with hover effects
- ✅ **Loading states** and error handling
- ✅ **Row Level Security** for data protection

## 6. Adding New Reviews

To add new reviews, you can:

1. **Via Supabase Dashboard**: Go to Table Editor → reviews → Insert
2. **Via SQL**: Insert directly into the database
3. **Via API**: Use the Supabase client (future feature)

Make sure to set `approved = true` for reviews to appear on the website.
