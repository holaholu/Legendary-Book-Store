import { Component, OnInit } from '@angular/core';
import { BooksService } from '../books.service';
import {Router} from '@angular/router';
import { Globals } from '../globals';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
myPassword1="";myPassword2="";errorMsg="";city;state;
constructor(private _flashMessagesService: FlashMessagesService,private booksService: BooksService,private router: Router,private globals: Globals) { }

onsubmit(){ 

  if (this.myPassword1==this.myPassword2){
 
// loginup and get user
    this.booksService.settings1(this.myPassword1)
       .subscribe(res => {
      this.globals.name = res, posterror => this.errorMsg=posterror ;});
  
// Go to home page
setTimeout(()=> {

  if(this.globals.name.length < 1){
    this.router.navigate(['/settings']);
    this._flashMessagesService.grayOut(true);
    this._flashMessagesService.show("Your password change not accepted", { timeout: 2500,cssClass: 'alert-danger' });
  } else {
     this.router.navigate(['']);
     this.globals.loggedin=true;
  }
  
}, 1000);
}else {
 this._flashMessagesService.grayOut(true);
    this._flashMessagesService.show("Your password entries are not equal", { timeout: 2500,cssClass: 'alert-danger' });


}
}



onsubmit2(){


// loginup and get user
    this.booksService.settings2(this.city,this.state)
       .subscribe(res => {
      this.globals.name = res, posterror => this.errorMsg=posterror ;});
  
// Go to home page
setTimeout(()=> {

  if(this.globals.name.length < 1){
    this.router.navigate(['/settings']);
    this._flashMessagesService.grayOut(true);
    this._flashMessagesService.show("Your password change not accepted", { timeout: 2500,cssClass: 'alert-danger' });
  } else {
     this.router.navigate(['']);
     this.globals.loggedin=true;
  }
  
}, 1000);

  
  
}

  
  ngOnInit() { 
    


   
  setTimeout(()=>{
if (this.globals.loggedin==true) {}else {
   this.router.navigate(['/login']);
}
  }, 1000);
    
   }
}
