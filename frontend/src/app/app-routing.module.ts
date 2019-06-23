import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { PropageComponent } from './propage/propage.component';
import { PostsComponent } from './posts/posts.component';
import { SigninComponent } from './signin/signin.component';
import { PropageEditComponent } from './propage/propage-edit/propage-edit.component';
import { PropagesComponent } from './propage/propages/propages.component';
import { PropageSelectComponent } from './propage/propage-select/propage-select.component';
import { SignoutComponent } from './signout/signout.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostSelectComponent } from './posts/post-select/post-select.component';
import { PostEditComponent } from './posts/post-edit/post-edit.component';
import { PostNewComponent } from './posts/post-new/post-new.component';

const appRoutes: Routes = [
    {path: '', redirectTo: '/propage', pathMatch: 'full' },
    {path: 'register', component: RegisterComponent },
    {path: 'propage', component: PropageComponent, children:[
        {path: '', component: PropagesComponent},
        {path: ':id', component: PropageSelectComponent},
        {path: ':id/edit', component: PropageEditComponent}
    ]},
    {path: 'posts', component: PostsComponent, children:[
        {path: '', component: PostListComponent},
        {path: 'new', component: PostNewComponent},
        {path: ':id', component: PostSelectComponent},
        {path: ':id/edit', component: PostEditComponent}
    ]},
    {path: 'login', component: SigninComponent},
    {path: 'logout', component: SignoutComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
exports: [RouterModule]
})

export class AppRouteModule {

}