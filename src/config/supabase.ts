import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://egwrvjknhehpkspqraae.supabase.co'
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVnd3J2amtuaGVocGtzcHFyYWFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjExMzgxMTQsImV4cCI6MjA3NjcxNDExNH0.rs-f7eHvpqKbEZF3rBLnexkEtAvIo10O1H2r-ZjyqOs'

if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseKey)

// Database types
export interface Review {
    id: number
    name: string
    rating: number
    comment: string
    location: string
    date: string
    created_at: string
    approved: boolean
}
