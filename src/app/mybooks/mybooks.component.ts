import { Component, OnInit } from '@angular/core';
import { Globals } from '../globals';
import {Router} from '@angular/router';
import { BooksService } from '../books.service';

@Component({
  selector: 'app-mybooks',
  templateUrl: './mybooks.component.html',
  styleUrls: ['./mybooks.component.css']
})
export class MybooksComponent implements OnInit {
allbooks;errorMsg;


return(i){
 
    //Update book with new owner
 this.booksService.return(this.allbooks[i]._id)
       .subscribe(res => {
      this.allbooks = res, posterror => this.errorMsg=posterror ;});
//Re- render library page
this.booksService.findall(this.globals.name,"false")
       .subscribe(res => {
      this.allbooks = res, posterror => this.errorMsg=posterror ;});
}

trade(i) {
  this.booksService.trade(this.allbooks[i]._id)
       .subscribe(res => {
      this.allbooks = res, posterror => this.errorMsg=posterror ;});

this.booksService.findall(this.globals.name,"false")
       .subscribe(res => {
      this.allbooks = res, posterror => this.errorMsg=posterror ;});

}


  constructor(private globals: Globals,private router: Router,private booksService: BooksService) { }

  ngOnInit() {

    this.booksService.findall(this.globals.name,"false")
       .subscribe(res => {
      this.allbooks = res, posterror => this.errorMsg=posterror ;});

    setTimeout(()=>{
if (this.globals.loggedin==true) {}else {
   this.router.navigate(['/login']);
}
  }, 1000);
  }

}
