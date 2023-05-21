import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
    "https://njwpofjdkvcughkwrhtk.supabase.co", 
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5qd3BvZmpka3ZjdWdoa3dyaHRrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQ2NDM3MzAsImV4cCI6MjAwMDIxOTczMH0.FNWvY3WD9NyHHhTbUG1Py0K2npv24rt33noQmdrwmIc");