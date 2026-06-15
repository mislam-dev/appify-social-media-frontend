"use client";

import { cn } from "@/lib/utils/cn";
import { Header } from "@/modules/feed/components/layout/Header";
import { LeftSidebar } from "@/modules/feed/components/layout/LeftSidebar";
import { MobileBottomNav } from "@/modules/feed/components/layout/MobileBottomNav";
import { MobileMenu } from "@/modules/feed/components/layout/MobileMenu";
import { RightSidebar } from "@/modules/feed/components/layout/RightSidebar";
import { ThemeToggle } from "@/modules/feed/components/layout/ThemeToggle";
import { PostComposer } from "@/modules/feed/components/post/PostComposer";
import { PostList } from "@/modules/feed/components/post/PostList";
import { StoryCarousel } from "@/modules/feed/components/post/StoryCarousel";
import { useFeedUiStore } from "@/modules/feed/store/ui.store";

export function FeedPage() {
  const darkMode = useFeedUiStore((s) => s.darkMode);

  return (
    <div
      className={cn(
        "_layout _layout_main_wrapper",
        darkMode && "_dark_wrapper",
      )}
    >
      <ThemeToggle />
      <div className="_main_layout">
        <Header />
        <MobileMenu />
        <MobileBottomNav />

        <div className="container _custom_container">
          <div className="_layout_inner_wrap">
            <div className="row">
              <LeftSidebar />

              <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                <div className="_layout_middle_wrap">
                  <div className="_layout_middle_inner">
                    <StoryCarousel />
                    <PostComposer />
                    <PostList />
                  </div>
                </div>
              </div>

              <RightSidebar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
