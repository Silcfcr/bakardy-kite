-- Simple visitor counter table
CREATE TABLE IF NOT EXISTS public.visitor_count (
    id SERIAL PRIMARY KEY,
    count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert initial record if table is empty
INSERT INTO public.visitor_count (count) 
SELECT 0 
WHERE NOT EXISTS (SELECT 1 FROM public.visitor_count);

-- Enable Row Level Security
ALTER TABLE public.visitor_count ENABLE ROW LEVEL SECURITY;

-- Allow public read and write access
CREATE POLICY "Allow public access" ON public.visitor_count
    FOR ALL USING (true) WITH CHECK (true);
