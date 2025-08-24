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
loginId:any
  borrowLimit = 3; 
   router=inject(Router)
  ngOnInit() {
    let id=localStorage.getItem("LoginUserDetails")
    this.loginId=JSON.parse(id??'')
    console.log(this.loginId.name)
    this.books = JSON.parse(localStorage.getItem('books') || '[]');
    this.transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
    this.currentUser=this.loginId
  }

  saveData(users: User[]) {
    localStorage.setItem('books', JSON.stringify(this.books));
    localStorage.setItem('userList', JSON.stringify(users));
    localStorage.setItem('transactions', JSON.stringify(this.transactions));
  }

  borrowBook(book: Book) {
    if (!book.available || this.currentUser.borrowedBooks.length >= this.borrowLimit) return;
    book.available = false;
    this.currentUser.borrowedBooks.push(book.id);

    this.transactions.push({
      userId: this.currentUser.name,
      bookId: book.id,
      action: 'borrowed',
      date: new Date().toISOString()
    });

    const users = JSON.parse(localStorage.getItem('userList') || '[]');
   
 for (let i = 0; i < users.length; i++) {
  if (users[i].name === this.currentUser.name) {
    users[i].borrowedBooks =  this.currentUser.borrowedBooks;
    
    break;
  }
}

console.log("USER",users)

    this.saveData(users);
  }

  returnBook(book: Book) {
    book.available = true;
    this.currentUser.borrowedBooks = this.currentUser.borrowedBooks.filter(id => id !== book.id);

    this.transactions.push({
      userId: this.currentUser.name,
      bookId: book.id,
      action: 'returned',
      date: new Date().toISOString()
    });

    const users = JSON.parse(localStorage.getItem('userList') || '[]');
     for (let i = 0; i < users.length; i++) {
  if (users[i].name === this.currentUser.name) {
    users[i].borrowedBooks =  this.currentUser.borrowedBooks;
    
    break;
  }
}
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
