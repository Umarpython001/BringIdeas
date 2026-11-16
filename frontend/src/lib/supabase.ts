import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const supabase_url = import.meta.env?.VITE_PROJECT_URL;
const supabase_PUBLISHABLE_key = import.meta.env?.VITE_PUBLISHABLE_KEY;

// A missing env pair must not crash the whole app at import time (a deploy
// before keys are set, a fresh clone, CI). Instead the client exports null
// and callers (e.g. the waiting-list page) degrade to an honest notice.
export const supabase: SupabaseClient | null = supabase_url && supabase_PUBLISHABLE_key ? createClient(supabase_url, supabase_PUBLISHABLE_key) : null;

if (supabase) {
  console.log('Supabase client created successfully');
} else {
  console.warn('Supabase credentials missing. Client initialized as null.');
}

// Top-level default export (can be null, or you can export just the named 'supabase' constant)
export default supabase;