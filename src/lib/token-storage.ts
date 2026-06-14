export const AUTH_TOKEN_KEY = "buddyscript.auth_token";
export const REFRESH_TOKEN_KEY = "buddyscript.refresh_token";

export interface AuthTokens {
  auth_token: string;
  refresh_token: string;
}

export class TokenStorage {
  constructor(
    private readonly authKey: string = AUTH_TOKEN_KEY,
    private readonly refreshKey: string = REFRESH_TOKEN_KEY,
  ) {}

  private get isBrowser(): boolean {
    return typeof window !== "undefined";
  }

  get(): AuthTokens | null {
    if (!this.isBrowser) return null;
    const auth_token = window.localStorage.getItem(this.authKey);
    const refresh_token = window.localStorage.getItem(this.refreshKey);
    if (!auth_token || !refresh_token) return null;
    return { auth_token, refresh_token };
  }

  set(tokens: AuthTokens): void {
    if (!this.isBrowser) return;
    window.localStorage.setItem(this.authKey, tokens.auth_token);
    window.localStorage.setItem(this.refreshKey, tokens.refresh_token);
  }

  clear(): void {
    if (!this.isBrowser) return;
    window.localStorage.removeItem(this.authKey);
    window.localStorage.removeItem(this.refreshKey);
  }
}

export const tokenStorage = new TokenStorage();
