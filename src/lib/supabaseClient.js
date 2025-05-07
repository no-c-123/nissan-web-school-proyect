// src/lib/supabaseClient.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 'https://qxbrhkwlwfmxlcnmgxuz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF4YnJoa3dsd2ZteGxjbm1neHV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ0MDI3NDIsImV4cCI6MjA1OTk3ODc0Mn0.dROIRv9fNmZ4KdbAyHTBu4qjfUqR_OdvzmxJRenA7LQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);