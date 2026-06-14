import type { Metadata } from "next";
import { FeedPage } from "@/modules/feed/pages/FeedPage";

export const metadata: Metadata = {
  title: "Feed · Buddy Script",
  description: "Your Buddy Script timeline.",
};

export default function Page() {
  return <FeedPage />;
}
