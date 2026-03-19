// import { createClient } from "@supabase/supabase-js";

// const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
// const supabaseAnon = import.meta.env.VITE_SUPABASE_ANON_KEY;

// if (!supabaseUrl || !supabaseAnon) {
//   console.error(
//     "⚠️  Missing Supabase env vars.\n" +
//       "Create a .env file in your project root with:\n" +
//       "  VITE_SUPABASE_URL=https://your-project.supabase.co\n" +
//       "  VITE_SUPABASE_ANON_KEY=your-anon-key",
//   );
// }

// export const supabase = createClient(supabaseUrl, supabaseAnon);


import { createClient } from '@supabase/supabase-js'

const supabaseUrl  = 'https://ixidtkfrqvuzlvatnfsn.supabase.co'
const supabaseAnon = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml4aWR0a2ZycXZ1emx2YXRuZnNuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM3MzU4NTQsImV4cCI6MjA4OTMxMTg1NH0.KLRmgWVq3AjVs015RlwaRJBmERmTz1x7Nv39jb6bdVo'

export const supabase = createClient(supabaseUrl, supabaseAnon)