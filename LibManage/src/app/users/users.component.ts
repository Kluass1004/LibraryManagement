import { Component, inject } from '@angular/core';
import { Book } from '../book.model';
import { User } from '../user.model';
import { Transaction } from '../transaction.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-users',
  imports: [CommonModule,FormsModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
 books: Book[] = [];
  transactions: Transaction[] = [];
  currentUser!: User;

  borrowLimit = 3; // Example limit
   router=inject(Router)
  ngOnInit() {
    this.books = JSON.parse(localStorage.getItem('books') || '[]');
    this.transactions = JSON.parse(localStorage.getItem('transactions') || '[]');

    // Example: assuming logged in user id = 1
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    this.currentUser = users.find((u: User) => u.id === 1) || { id: 1, name: 'Test User', role: 'user', borrowedBooks: [] };
    if (!users.find((u: User) => u.id === 1)) {
      users.push(this.currentUser);
      localStorage.setItem('users', JSON.stringify(users));
    }
  }

  saveData(users: User[]) {
    localStorage.setItem('books', JSON.stringify(this.books));
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('transactions', JSON.stringify(this.transactions));
  }

  borrowBook(book: Book) {
    if (!book.available || this.currentUser.borrowedBooks.length >= this.borrowLimit) return;
    book.available = false;
    this.currentUser.borrowedBooks.push(book.id);

    this.transactions.push({
      userId: this.currentUser.id,
      bookId: book.id,
      action: 'borrowed',
      date: new Date().toISOString()
    });

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const idx = users.findIndex((u: User) => u.id === this.currentUser.id);
    users[idx] = this.currentUser;
    this.saveData(users);
  }

  returnBook(book: Book) {
    book.available = true;
    this.currentUser.borrowedBooks = this.currentUser.borrowedBooks.filter(id => id !== book.id);

    this.transactions.push({
      userId: this.currentUser.id,
      bookId: book.id,
      action: 'returned',
      date: new Date().toISOString()
    });

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const idx = users.findIndex((u: User) => u.id === this.currentUser.id);
    users[idx] = this.currentUser;
    this.saveData(users);
  }
  logout(){
  localStorage.setItem("isLoggedIn",'false');
  this.router.navigateByUrl('home')
 
}
  getBookTitle(bookId: number): string {
  const book = this.books.find(b => b.id === bookId);
  return book ? book.title : 'Unknown Book';
}
}
