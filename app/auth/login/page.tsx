import { createSupabaseServerClient } from "@/lib/supabase/server-client";
import LoginForm from "./login-form.client";
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
      <LoginForm />
    </div>
  );
}

export default Page;
