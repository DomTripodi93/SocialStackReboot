import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(
    private auth: AuthService
  ){}
  
  ngOnInit(){
    this.auth.user = localStorage.getItem('id'),
    this.auth.token = localStorage.getItem('token');
    if (this.auth.user){
      this.auth.isAuthenticated = true; 
    } else {
      this.auth.isAuthenticated = false;
    }
  }
}
