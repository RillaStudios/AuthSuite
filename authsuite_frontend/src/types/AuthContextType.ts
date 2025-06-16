/* 
A TypeScript interface for the authentication context.

@author IFD
@date 2025-06-15
*/
export default interface AuthContextType {
  user: any;
  isAuthenticated: boolean;
  accessToken: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refresh: () => Promise<boolean>;
}