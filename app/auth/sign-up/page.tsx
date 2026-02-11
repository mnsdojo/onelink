import { createSupabaseServerClient } from "@/lib/supabase/server-client";
import SignupForm from "./signup-form.client";
import { redirect } from "next/navigation";

async function Page() {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/");
  }

  return (
    <div>
      <SignupForm user={user} />
    </div>
  );
}

export default Page;
