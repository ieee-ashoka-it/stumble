import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { Sidebar } from "@/components/sidebar";
import { createClient } from "@/utils/supabase/server";

export const metadata: Metadata = {
  title: "Stumble",
  description: "Stumble",
};

async function getUserData(userId: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (error) {
    console.error(error);
  }

  return data;
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const userData = await getUserData(user?.id || "");

  return (
    <html lang="en">
      <body>
        <Providers>
          <Sidebar user={user || null} userData={userData} />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
