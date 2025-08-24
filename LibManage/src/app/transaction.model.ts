export interface Transaction {
  userId: String;
  bookId: number;
  action: 'borrowed' | 'returned';
  date: string;
}
