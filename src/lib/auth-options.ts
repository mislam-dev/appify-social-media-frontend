export {
  AUTH_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
  TokenStorage,
  tokenStorage,
} from "@/lib/token-storage";
export type { AuthTokens } from "@/lib/token-storage";

export const AUTH_ROUTES = {
  login: "/login",
  register: "/register",
  afterLogin: "/feed",
} as const;
