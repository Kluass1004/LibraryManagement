import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../user.model';
@Component({
  selector: 'app-home',
  imports: [ReactiveFormsModule,FormsModule,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
users: User[] = [];
 signUpUsers:any=[];
 isLoggedIn:boolean=true;
 signUpObj:any={
  name:'',
  email:'',
  userType:'',
  password:'',
  borrowedBooks:[]
 }
 loginObj:any={
    name:'',
    password:''
 }
 router=inject(Router)
  ngOnInit(): void {
 
}

onSignUp(){
const localUserList=localStorage.getItem('userList');
if(localUserList != null){
  const userArr=JSON.parse(localUserList)
  userArr.push(this.signUpObj)
  localStorage.setItem('userList',JSON.stringify(userArr))
}
else{
  const userArr=[]
  userArr.push(this.signUpObj)
  localStorage.setItem('userList',JSON.stringify(userArr))
}
this.signUpObj={
  name:'',
  email:'',
  userType:'',
  password:'',
  borrowedBooks:[]
 }
alert("SignUp Successfull")
}
onLogin(){
 const localUserList=localStorage.getItem('userList');
if(localUserList != null && this.loginObj.name != '' && this.loginObj.password != ''){
  const user=JSON.parse(localUserList)
  let validUser={
    email:"",
    name:"",
    password:"",
    userType:""
  }
   validUser=user.find((m:any) => m.name === this.loginObj.name && m.password === this.loginObj.password)
  console.log("User login details",validUser)
  localStorage.setItem("LoginUserDetails",JSON.stringify(validUser))
if(validUser != undefined){
 this.isLoggedIn=true;
 localStorage.setItem("isLoggedIn",JSON.stringify(this.isLoggedIn))
  if(validUser.userType == 'admin'){
    this.router.navigateByUrl('admin')
  }
  else{
    this.router.navigateByUrl('users')
  }
}
else{
  alert("Incorrect Username or password")
}
}
else{
  alert("No user Found")
}
}
}
