import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
// IMPORTANTE: Usa la clave 'anon' (public), NO la 'service_role' (secret)
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl) {
    console.error('Error: NEXT_PUBLIC_SUPABASE_URL is missing in .env.local')
}
if (!supabaseAnonKey) {
    console.error('Error: NEXT_PUBLIC_SUPABASE_ANON_KEY is missing in .env.local')
}

// Fallback to avoid crash during build/dev if env vars are missing
// This will allow the app to start, but Supabase calls will fail
export const supabase = createClient(
    supabaseUrl || 'https://your-project.supabase.co',
    supabaseAnonKey || 'your-anon-key'
)
