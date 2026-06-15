/* Central TanStack Query key registry for the feed module. Keeping keys in
   one place keeps the cache layer consistent and makes invalidation explicit. */
export const feedKeys = {
  all: ["feed"] as const,

  posts: () => [...feedKeys.all, "posts"] as const,
  post: (id: string) => [...feedKeys.all, "post", id] as const,

  comments: (postId: string) => [...feedKeys.all, "comments", postId] as const,
  replies: (commentId: string) =>
    [...feedKeys.all, "replies", commentId] as const,

  postLikes: (postId: string) =>
    [...feedKeys.all, "post-likes", postId] as const,
  commentLikes: (commentId: string) =>
    [...feedKeys.all, "comment-likes", commentId] as const,
};
