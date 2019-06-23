import { Component, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Signin } from './signin.model';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  error = new Subject<string>();
  apiUrl = 'http://localhost:8000/api';
  @ViewChild('data') signinForm: NgForm;
  user={
    username: '',
    password: ''
  }
  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
    ) {}

  onSubmit(){
    this.user.username= this.signinForm.value.email;
    this.user.password= this.signinForm.value.password;
    this.signinUser(this.user);
    this.signinForm.reset();
  }

  signinUser(data: Signin){
    this.http.post<{name:string}>(
      this.apiUrl + '/login/',
      data,
      {
        observe: 'response'
      }
    )
    .subscribe(responseData => {
      this.auth.user = responseData.body['id'];
      this.auth.token = responseData.body['token'];
      this.auth.name = responseData.body['name'];
      localStorage.setItem('token', responseData.body['token']);
      localStorage.setItem('id', responseData.body['id']);
      this.auth.authChanged.next();
      this.router.navigate(["../propage", this.auth.user], {relativeTo: this.route})

    }, error =>
    this.error.next(error.message));    
    }
}