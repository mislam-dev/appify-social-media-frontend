import type { Metadata } from "next";
import { LoginPage } from "@/modules/auth/pages/LoginPage";

export const metadata: Metadata = {
  title: "Login · Buddy Script",
  description: "Sign in to your Buddy Script account.",
};

export default function Page() {
  return <LoginPage />;
}
