
import { createClient } from '@supabase/supabase-js'

// Initialize the Supabase client
// For development, provide fallback values if environment variables are missing
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

// Log a warning instead of error for development
if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
  console.warn('⚠️ Missing Supabase environment variables. Authentication functionality will not work correctly. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Helper function to get the current user
export const getCurrentUser = async () => {
  const { data: { session } } = await supabase.auth.getSession()
  return session?.user ?? null
}

// Helper function to check if user has a business profile
export const hasBusinessProfile = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('businesses')
      .select('*')
      .eq('user_id', userId)
      .single()
    
    if (error) {
      console.error('Error checking business profile:', error)
      return false
    }
    
    return !!data
  } catch (e) {
    console.error('Error in hasBusinessProfile:', e)
    return false
  }
}
