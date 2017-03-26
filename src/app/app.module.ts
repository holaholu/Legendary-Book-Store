import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { AppComponent } from './app.component';
import {Routes,RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { BooksService } from './books.service';
import { Globals } from './globals';
import { SettingsComponent } from './settings/settings.component';
import { AllbooksComponent } from './allbooks/allbooks.component';
import { MybooksComponent } from './mybooks/mybooks.component';
import { TradedComponent } from './traded/traded.component';

const routes:Routes = [
  {
    path: '',
     component: HomeComponent
   
  },
   {path: 'login',
     component: LoginComponent 
   
  },
   {path: 'signup',
     component: SignupComponent 
   
  },
  
   {path: 'settings',
     component: SettingsComponent
   
  },
  {path: 'allbooks',
     component: AllbooksComponent 
   
  },
  
  {path: 'mybooks',
     component: MybooksComponent
   
  },
  
  {path: 'traded',
     component: TradedComponent 
   
  }
  ]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignupComponent,
    LoginComponent,
    SettingsComponent,
    AllbooksComponent,
    MybooksComponent,
    TradedComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
     FlashMessagesModule,
    RouterModule.forRoot(routes) // Add routes to the app
  ],
  providers: [BooksService,Globals],
  bootstrap: [AppComponent]
})
export class AppModule { }
