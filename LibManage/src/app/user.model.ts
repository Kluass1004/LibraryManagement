export interface User {
  id: number;
  name: string;
  role: 'admin' | 'user';
  borrowedBooks: number[]; // book ids
}
