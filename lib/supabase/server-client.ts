import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { getEnvironmentVariables } from "./supabase-env";

export async function createSupabaseServerClient() {
  const { supabaseUrl, supabaseAnonKey } = getEnvironmentVariables();
  const cookieStore = await cookies();
  return createServerClient(supabaseUrl, supabaseAnonKey, {
    global: {
      headers: {
        apikey: supabaseAnonKey,
      },
    },
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch (error) {
          console.log(error);
        }
      },
    },
  });
}
