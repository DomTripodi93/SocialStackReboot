import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from './user.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  error = new Subject<string>();
  apiUrl = 'http://localhost:8000/api';
  @ViewChild('data') signupForm: NgForm;
  submitted = false;
  user={
    email: '',
    name: '',
    password: ''
  }
  constructor(private http: HttpClient) {}

  onSubmit(){
    this.submitted = true;
    this.user = this.signupForm.value;
    this.registerUser(this.user);
    this.signupForm.reset();
  }

  registerUser(data: User){
    this.http.post<{name:string}>(
      this.apiUrl + '/register.json',
      data,
      {
        observe: 'response'
      }
    )
    .subscribe(responseData => {
      console.log(responseData);
    }, error =>
    this.error.next(error.message));    
  }

}