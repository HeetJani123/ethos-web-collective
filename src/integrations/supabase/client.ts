// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://yxymjxiumlfyunwlbove.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl4eW1qeGl1bWxmeXVud2xib3ZlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI4MjQ2NjYsImV4cCI6MjA2ODQwMDY2Nn0.zCYRCsV-LxT6p6p_mxJeRT_l00xmoTSJ7E8ZGvMlY-c";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});