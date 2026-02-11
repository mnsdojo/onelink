// supabase-env.ts
import { assertEnv } from "../utils";

export function getEnvironmentVariables() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  assertEnv(url, "NEXT_PUBLIC_SUPABASE_URL");
  assertEnv(key, "NEXT_PUBLIC_SUPABASE_ANON_KEY");
  
  return {
    supabaseUrl: url!,
    supabaseAnonKey: key!,
  };
}
