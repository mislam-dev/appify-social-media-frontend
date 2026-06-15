export const feedEndpoints = {
  posts: "/posts",
  post: (id: string) => `/posts/${id}`,

  postComments: (postId: string) => `/posts/${postId}/comments`,
  postComment: (postId: string, id: string) =>
    `/posts/${postId}/comments/${id}`,

  postLikes: (postId: string) => `/posts/${postId}/likes`,

  commentReplies: (commentId: string) => `/comments/${commentId}/replies`,
  commentReply: (commentId: string, id: string) =>
    `/comments/${commentId}/replies/${id}`,

  commentLikes: (commentId: string) => `/comments/${commentId}/likes`,
} as const;
