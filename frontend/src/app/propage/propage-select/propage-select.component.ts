import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { PropageService } from '../propage.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-propage-select',
  templateUrl: './propage-select.component.html',
  styleUrls: ['./propage-select.component.css']
})
export class PropageSelectComponent implements OnInit, OnDestroy {
  isFetching = false;
  isError = false;
  apiUrl = 'http://localhost:8000/api';
  id= "";
  propage = [];
  error = '';
  myPropage = false;
  editInterests = false;
  editBio = false;
  editGoals = false;
  subscription: Subscription;
  subscription2: Subscription;


  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private pro: PropageService
    ) { }

  ngOnInit() {
    this.subscription2 = this.route.params.subscribe((params: Params) =>{
      this.id = params['id'];
      this.getPropage();
    });
    if (this.id === this.auth.user) {
      this.myPropage = true;
    }
    this.subscription = this.auth.authChanged.subscribe(
      ()=>{
        this.id = this.auth.user
      }
    )
  }

  getPropage() {
    this.isFetching = true;
    this.pro.fetchPropage(this.id)
      .subscribe(propage => {
        this.propage = propage;
        this.isFetching = false;
      }, error => {
        this.isFetching = false;
        this.isError = true;
        this.error = error.message
      })
  }  

  interestEdit(){
    this.editInterests = true;
  }

  subInterests(){
    this.editInterests = false;
  }

  goalEdit(){
    this.editGoals = true;
  }

  subGoals(){
    this.editGoals = false;
  }

  bioEdit(){
    this.editBio = true;
  }

  subBio(){
    this.editBio = false;
  }

  editPropage(){
    this.router.navigate(["edit"], {relativeTo: this.route})
  }
  
  ngOnDestroy(){
    this.subscription.unsubscribe();
    this.subscription2.unsubscribe();
  }

}
