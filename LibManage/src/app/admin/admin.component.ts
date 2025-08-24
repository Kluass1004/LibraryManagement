import { Component, inject, OnInit } from '@angular/core';
import { Book } from '../book.model';
import { User } from '../user.model';
import { Transaction } from '../transaction.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  imports: [CommonModule,FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  books: Book[] = [];
  users: User[] = [];
  transactions: Transaction[] = [];

  newBook: Partial<Book> = {};
  loginId:any
  router=inject(Router)

  ngOnInit() {
    let id=localStorage.getItem("LoginUserDetails")
    this.loginId=JSON.parse(id??'')
    console.log(this.loginId.name)
    this.loadData();
  }

  loadData() {
    this.books = JSON.parse(localStorage.getItem('books') || '[]');
    this.users = JSON.parse(localStorage.getItem('users') || '[]');
    this.transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
  }

  saveData() {
    localStorage.setItem('books', JSON.stringify(this.books));
    localStorage.setItem('users', JSON.stringify(this.users));
    localStorage.setItem('transactions', JSON.stringify(this.transactions));
  }

  addBook() {
    if (!this.newBook.title || !this.newBook.author) return;
    const book: Book = {
      id: Date.now(),
      title: this.newBook.title,
      author: this.newBook.author,
      available: true
    };
    this.books.push(book);
    this.saveData();
    this.newBook = {};
  }

 editBook(book: Book) {
  const newTitle = window.prompt('New Title', book.title);   // ⬅️ call here
  const newAuthor = window.prompt('New Author', book.author);

  if (newTitle && newAuthor) {
    book.title = newTitle;
    book.author = newAuthor;
    this.saveData();
  }
}
logout(){
  localStorage.setItem("isLoggedIn",'false');
  this.router.navigateByUrl('home')
 
}
}
