import LandingPage from "@/components/landing-page";
import { createSupabaseServerClient } from "@/lib/supabase/server-client";

export default async function App() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return <LandingPage user={user} />;
}
