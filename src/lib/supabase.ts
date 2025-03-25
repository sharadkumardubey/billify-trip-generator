
import { createClient } from '@supabase/supabase-js'

// Initialize the Supabase client
// For development, provide fallback values if environment variables are missing
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

// Log a warning instead of error for development
if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
  console.warn('⚠️ Missing Supabase environment variables. Authentication functionality will not work correctly. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.');
} else {
  console.log('Supabase initialized with URL:', supabaseUrl);
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Validate the Supabase connection
const validateSupabaseConnection = async () => {
  try {
    const { error } = await supabase.from('businesses').select('count', { count: 'exact', head: true });
    if (error) {
      console.error('⚠️ Supabase connection error:', error);
      return false;
    }
    console.log('✅ Supabase connection validated successfully');
    return true;
  } catch (e) {
    console.error('⚠️ Exception during Supabase validation:', e);
    return false;
  }
};

// Call the validation function
validateSupabaseConnection();

// Helper function to get the current user
export const getCurrentUser = async () => {
  const { data: { session }, error } = await supabase.auth.getSession()
  if (error) {
    console.error('Error getting session:', error);
    return null;
  }
  return session?.user ?? null
}

// Helper function to check if user has a business profile
export const hasBusinessProfile = async (userId: string) => {
  if (!userId) {
    console.warn('hasBusinessProfile called with empty userId');
    return false;
  }

  try {
    console.log('Checking business profile for user:', userId);
    
    const { data, error } = await supabase
      .from('businesses')
      .select('*')
      .eq('user_id', userId)
      .single()
    
    if (error) {
      if (error.code === 'PGRST116') {
        // This is the "no rows returned" error, which is expected if no profile exists
        console.log('No business profile found for user:', userId);
        return false;
      }
      
      console.error('Error checking business profile:', error);
      return false;
    }
    
    console.log('Business profile found:', data ? 'yes' : 'no');
    return !!data
  } catch (e) {
    console.error('Exception in hasBusinessProfile:', e);
    return false;
  }
}
