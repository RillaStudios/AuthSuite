/* 
A TypeScript interface for the loading context.

@author IFD
@date 2025-06-15
*/
export default interface LoadingContextType {
  loading: boolean;
  toggleLoading: (state: boolean) => void;
}