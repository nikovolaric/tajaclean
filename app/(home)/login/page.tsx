import LoginForm from "@/components/admin/LoginForm";
import { createClient } from "@/lib/supabase/server";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Vpišite se",
};

async function Page() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();

  if (!error && data?.user) {
    redirect("/admin");
  }

  return (
    <>
      <div>
        <LoginForm />
      </div>
    </>
  );
}

export default Page;
