import { Injectable } from '@angular/core';
import { map } from "rxjs/operators";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { Propage } from './propage.model';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class PropageService {
    apiUrl = 'http://localhost:8000/api';
    proChanged = new Subject();

    constructor(
        private http: HttpClient,
        private auth: AuthService
        ) {}

    fetchPropage(id) {
        return this.http.get(
          this.apiUrl + '/propage/' + id + '/'
        )
        .pipe(
          map((responseData: Propage) => {
            const proHold: Propage[] = [];
            proHold.push(responseData);
          return proHold;
          })
        )
    } 

    fetchPropages() {
        return this.http.get(
          this.apiUrl + '/propage/'
        )
        .pipe(
          map(responseData => {
            const proHold: Propage [] = [];
            for (const key in responseData) {
              if(responseData.hasOwnProperty(key)){
                proHold.push({...responseData[key], id: key })
              }
            }
          return proHold;
          })
        )
      }

      changePropage(data: Propage){
        let myHeaders = new HttpHeaders({
          "Authorization": 'Token ' + this.auth.token
        });
        return this.http.put(
          this.apiUrl + '/propage/' + this.auth.user + "/", data, {
            headers: myHeaders
          }
        );
        
      }
}