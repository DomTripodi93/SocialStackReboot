import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PropageService } from '../propage.service';
import { Propage } from '../propage.model';

@Component({
  selector: 'app-propage-edit',
  templateUrl: './propage-edit.component.html',
  styleUrls: ['./propage-edit.component.css']
})
export class PropageEditComponent implements OnInit {
  id: number;
  canEdit = false;
  propageForm: FormGroup;
  propage: Propage;

  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,
    private pro: PropageService,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) =>{
      this.id = +params['id'];
    });
    if (this.id == +this.auth.user) {
      this.canEdit = true;
    };
    this.pro.fetchPropage(this.id)
    .subscribe(pro => {
      this.propage = pro[0];
      this.initForm();
    });
  }

  private initForm() {
    let name = this.propage.name;
    let bio = this.propage.bio;
    let goals = this.propage.goals;
    let interests = this.propage.interests;

    this.propageForm = new FormGroup({
      'name': new FormControl(name, Validators.required),
      'bio': new FormControl(bio, Validators.required),
      'goals': new FormControl(goals, Validators.required),
      'interests': new FormControl(interests, Validators.required)
    });
  }

  onSubmit(){
    this.propage = this.propageForm.value;
    this.editPropage(this.propage);
  }

  editPropage(data: Propage) {
    this.pro.changePropage(data).subscribe();
    this.router.navigate([".."], {relativeTo: this.route});
  }

  onCancel(){
    this.router.navigate([".."], {relativeTo: this.route});
  }

}
