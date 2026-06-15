"use client";

import { ErrorBoundary } from "@/components/feedback/ErrorBoundary";
import { LoadingSkeleton } from "@/components/feedback/LoadingSkeleton";
import { PostCard } from "@/modules/feed/components/post/PostCard";
import { usePosts } from "@/modules/feed/hooks/usePosts";

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
          <pre>{JSON.stringify(error, undefined, 2)}</pre>
          Couldn’t load the feed: <pre>{(error as Error).message}</pre>
        </p>
      </div>
    );
  }

  const posts = data?.flat ?? [];

  if (posts.length === 0) {
    return (
      <div className="_feed_inner_timeline_post_area _b_radious6 _padd_b24 _padd_t24 _mar_b16">
        <p className="px-6 text-sm text-gray-400">No posts yet.</p>
      </div>
    );
  }

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
