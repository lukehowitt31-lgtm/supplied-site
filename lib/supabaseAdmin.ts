import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Create a single supabase client for interacting with your database
// We check for env vars inside the function or usage to prevent build-time crashes if they are missing
// (Vercel builds sometimes run without sensitive env vars)
// Confirmed working with project: tbuqrtguzxrxpwifcodx
export const supabaseAdmin = (supabaseUrl && supabaseServiceRoleKey) 
  ? createClient(supabaseUrl, supabaseServiceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })
  : null;

if (!supabaseAdmin && process.env.NODE_ENV !== 'production') {
  console.warn('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY. Supabase features will be disabled.');
}
