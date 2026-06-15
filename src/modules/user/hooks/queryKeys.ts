/* Central TanStack Query key registry for the user module. */
export const userKeys = {
  all: ["users"] as const,

  user: (id: string) => [...userKeys.all, id] as const,
};
