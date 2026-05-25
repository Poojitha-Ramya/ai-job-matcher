import { createClient } from "@supabase/supabase-js";

// Vite environment variables (prefixed with VITE_)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://placeholder-url.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "placeholder-anon-key";

// Setup the supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper to check if Supabase is properly configured
export const isSupabaseConfigured = () => {
  const url = import.meta.env.VITE_SUPABASE_URL;
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (!url || !key) return false;

  return (
    url !== "https://placeholder-url.supabase.co" &&
    url !== "https://your-project-id.supabase.co" &&
    !url.includes("your-project-id") &&
    key !== "placeholder-anon-key" &&
    !key.includes("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...")
  );
};
