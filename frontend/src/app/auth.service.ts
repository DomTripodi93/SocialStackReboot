import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';

@Injectable({providedIn:'root'})
export class AuthService {
    token = '';
    user = '';
    name = '';
    isAuthenticated = false;
    authChanged = new Subject();
    
    logout(){
        this.user = '';
        this.token = '';
        this.name = '';
        this.isAuthenticated = false;
        localStorage.setItem('token', '');
        localStorage.setItem('id', '');
        this.authChanged.next();
    }
}