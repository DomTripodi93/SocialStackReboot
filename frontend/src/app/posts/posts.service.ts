import { Injectable } from '@angular/core';
import { map } from "rxjs/operators";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { Subject } from 'rxjs';
import { Post } from './posts.model';

@Injectable({providedIn: 'root'})
export class PostsService {
    apiUrl = 'http://localhost:8000/api';
    postChanged = new Subject();
    id ='';

    constructor(
        private http: HttpClient,
        private auth: AuthService
        ) {}

    fetchPost(id) {
        return this.http.get(
          this.apiUrl + '/posts/' + id + '/'
        )
        .pipe(
          map((responseData: Post) => {
            const postHold: Post[] = [];
            postHold.push(responseData);
          return postHold;
          })
        )
    } 

    fetchPosts() {
        return this.http.get(
          this.apiUrl + '/posts/'
        )
        .pipe(
          map(responseData => {
            const postHold: Post [] = [];
            for (const key in responseData) {
              if(responseData.hasOwnProperty(key)){
                postHold.push({...responseData[key], idx: key })
              }
            }
          return postHold;
          })
        )
      }

      newPost(data: Post){
        let myHeaders = new HttpHeaders({
            "Authorization": 'Token ' + this.auth.token
          });
          return this.http.post(
            this.apiUrl + '/posts/', data, {
              headers: myHeaders
            }
          );
      }

      changePost(data: Post){
        let myHeaders = new HttpHeaders({
          "Authorization": 'Token ' + this.auth.token
        });
        return this.http.put(
          this.apiUrl + '/posts/' + this.id + "/", data, {
            headers: myHeaders
          }
        );
        
      }
}