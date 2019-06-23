import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../auth.service';
import { PropageService } from '../propage.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-propages',
  templateUrl: './propages.component.html',
  styleUrls: ['./propages.component.css']
})
export class PropagesComponent implements OnInit, OnDestroy{
  isFetching = false;
  isError = false;
  apiUrl = 'http://localhost:8000/api';
  propages = [];
  error = '';
  subscription: Subscription;

  constructor(
    private pro: PropageService
    ) {}

  ngOnInit() {
    this.fetchPropages();
  }

  fetchPropages() {
    this.isFetching = true;
    this.subscription = this.pro.fetchPropages()
    .subscribe(propage => {
      this.propages = propage;
      this.isFetching = false;
    }, error => {
      this.isFetching = false;
      this.isError = true;
      this.error = error.message
    });
    
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}

