import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: import.meta.env.VITE_BETTER_AUTH_CLIENT_BASE_URL,
  basePath: import.meta.env.VITE_BETTER_AUTH_CLIENT_BASE_PATH,
});
