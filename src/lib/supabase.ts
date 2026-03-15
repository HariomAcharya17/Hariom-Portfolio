import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://dcupbidseyktfsmibshs.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRjdXBiaWRzZXlrdGZzbWlic2hzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM0Njc5ODgsImV4cCI6MjA4OTA0Mzk4OH0.FA6RKPWwZyxFXwprqVjswvZr9VicfLPJ39Q9k_DaUYE";

export const supabase = createClient(supabaseUrl, supabaseKey);