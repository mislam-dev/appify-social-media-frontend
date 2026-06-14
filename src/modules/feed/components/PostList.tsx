"use client";

import { LoadingSkeleton } from "@/components/feedback/LoadingSkeleton";
import { ErrorBoundary } from "@/components/feedback/ErrorBoundary";
import { usePosts } from "@/modules/feed/hooks/usePosts";
import { PostCard } from "@/modules/feed/components/PostCard";

export function PostList() {
  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = usePosts();

  if (isLoading) return <LoadingSkeleton count={2} />;

  if (isError) {
    return (
      <div className="_feed_inner_timeline_post_area _b_radious6 _padd_b24 _padd_t24 _mar_b16">
        <p className="px-6 text-sm text-rose-500">
          Couldn’t load the feed: {(error as Error).message}
        </p>
      </div>
    );
  }

  const posts = data?.flat ?? [];

  return (
    <ErrorBoundary>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}

      {hasNextPage ? (
        <div className="mb-4 flex justify-center">
          <button
            type="button"
            className="_feed_inner_text_area_btn_link"
            onClick={() => void fetchNextPage()}
            disabled={isFetchingNextPage}
            style={{ minWidth: 160 }}
          >
            <span>{isFetchingNextPage ? "Loading…" : "Load more posts"}</span>
          </button>
        </div>
      ) : null}
    </ErrorBoundary>
  );
}
