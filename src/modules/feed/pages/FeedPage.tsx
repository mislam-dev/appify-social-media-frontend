"use client";

import { cn } from "@/lib/utils/cn";
import { useFeedUiStore } from "@/modules/feed/store/ui.store";
import { ThemeToggle } from "@/modules/feed/components/layout/ThemeToggle";
import { Header } from "@/modules/feed/components/layout/Header";
import { MobileMenu } from "@/modules/feed/components/layout/MobileMenu";
import { MobileBottomNav } from "@/modules/feed/components/layout/MobileBottomNav";
import { LeftSidebar } from "@/modules/feed/components/layout/LeftSidebar";
import { StoryCarousel } from "@/modules/feed/components/post/StoryCarousel";
import { PostComposer } from "@/modules/feed/components/post/PostComposer";
import { PostList } from "@/modules/feed/components/post/PostList";
import { RightSidebar } from "@/modules/feed/components/layout/RightSidebar";

export function FeedPage() {
  const darkMode = useFeedUiStore((s) => s.darkMode);

  return (
    <div className={cn("_layout _layout_main_wrapper", darkMode && "_dark_wrapper")}>
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
