import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client with dummy URL (you'll replace this later)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;