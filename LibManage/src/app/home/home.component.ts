import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
@Component({
  selector: 'app-home',
  imports: [ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
 myForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.myForm = this.fb.group({
      name: [''],
      age:[''],
      email: [''],
      userType:['']
    });
  }

  onSubmit() {
    console.log('Form values:', this.myForm.value);
  }

  ngOnInit(): void {
  throw new Error('Method not implemented.');
}

}
