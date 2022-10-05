export interface AuthSlice {
  refresh: string | null;
  access: string | null;
  isAuthenticated: boolean | null;
  authenticateUser: (refreshToken: string, accessToken: string) => void;
  unauthenticateUser: () => void;
  // user: any;
  // getUser: () => Awaited<Promise<any>>;
}
