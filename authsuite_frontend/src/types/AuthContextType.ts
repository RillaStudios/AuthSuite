import type { UserType } from "./UserType";

/* 
A TypeScript interface for the authentication context.

@author IFD
@date 2025-06-15
*/
export default interface AuthContextType {
  user: UserType | null;
  isAuthenticated: boolean;
  accessToken: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refresh: () => Promise<boolean>;
}