import { Component, OnInit } from '@angular/core';
import { BooksService } from '../books.service';
import {Router} from '@angular/router';
import { Globals } from '../globals';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
user: any = []; check=""
 errorMsg =[];msg="";
myName="";myPassword="";myEmail="";
constructor(private _flashMessagesService: FlashMessagesService,private booksService: BooksService,private router: Router,private globals: Globals) { }

onsubmit(){
 
// signup and get user
    this.booksService.signUp(this.myName,this.myPassword,this.myEmail)
       .subscribe(res => {
      this.globals.name = res, posterror => this.errorMsg=posterror ;});
  
// Go to home page

setTimeout(()=> {

  if(this.globals.name.length < 1|| /User already/g.test(this.globals.name)){
    this.msg=this.globals.name;
    this._flashMessagesService.grayOut(true);
    this._flashMessagesService.show(this.msg, { timeout: 2500,cssClass: 'alert-danger' });
  } else {
     this.router.navigate(['/mybooks']);
     this.globals.loggedin=true;

  }
  console.log(this.globals.name );
}, 2000);
   
   

}

  
  ngOnInit() { 
    
    
   }
  

}

