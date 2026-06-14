import type { Metadata } from "next";
import { RegisterPage } from "@/modules/auth/pages/RegisterPage";

export const metadata: Metadata = {
  title: "Register · Buddy Script",
  description: "Create your Buddy Script account.",
};

export default function Page() {
  return <RegisterPage />;
}
