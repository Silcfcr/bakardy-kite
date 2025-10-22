-- Add countryCode column to existing reviews table
ALTER TABLE public.reviews 
ADD COLUMN countryCode TEXT;

-- Update existing reviews with sample country codes (optional)
UPDATE public.reviews 
SET countryCode = CASE 
  WHEN id = 1 THEN 'DE'
  WHEN id = 2 THEN 'US'
  WHEN id = 3 THEN 'GB'
  WHEN id = 4 THEN 'FR'
  WHEN id = 5 THEN 'NL'
  WHEN id = 6 THEN 'CH'
  ELSE 'XX'
END
WHERE countryCode IS NULL;
