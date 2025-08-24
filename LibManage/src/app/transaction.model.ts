export interface Transaction {
  userId: number;
  bookId: number;
  action: 'borrowed' | 'returned';
  date: string;
}
