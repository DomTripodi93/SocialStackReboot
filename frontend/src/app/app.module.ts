import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRouteModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { PropageComponent } from './propage/propage.component';
import { PostsComponent } from './posts/posts.component';
import { SigninComponent } from './signin/signin.component';
import { PropageEditComponent } from './propage/propage-edit/propage-edit.component';
import { PostNewComponent } from './posts/post-new/post-new.component';
import { PostEditComponent } from './posts/post-edit/post-edit.component';
import { PropagesComponent } from './propage/propages/propages.component';
import { PropageSelectComponent } from './propage/propage-select/propage-select.component';
import { SignoutComponent } from './signout/signout.component';
import { PostSelectComponent } from './posts/post-select/post-select.component';
import { PostListComponent } from './posts/post-list/post-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RegisterComponent,
    PropageComponent,
    PostsComponent,
    SigninComponent,
    PropageEditComponent,
    PostNewComponent,
    PostEditComponent,
    PropagesComponent,
    PropageSelectComponent,
    SignoutComponent,
    PostSelectComponent,
    PostListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRouteModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
