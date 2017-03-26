import { Component, OnInit } from '@angular/core';
import { Globals } from '../globals';
import {Router} from '@angular/router';
import { BooksService } from '../books.service';


@Component({
  selector: 'app-traded',
  templateUrl: './traded.component.html',
  styleUrls: ['./traded.component.css']
})
export class TradedComponent implements OnInit {
allbooks;errorMsg;


claim(i){

this.booksService.claimtrade(this.allbooks[i]._id)
       .subscribe(res => {
      this.allbooks = res, posterror => this.errorMsg=posterror ;});

this.booksService.findtrade()
       .subscribe(res => {
      this.allbooks = res, posterror => this.errorMsg=posterror ;});

}
  constructor(private booksService: BooksService,private globals: Globals,private router: Router) { }

  ngOnInit() {

    this.booksService.findtrade()
       .subscribe(res => {
      this.allbooks = res, posterror => this.errorMsg=posterror ;});



      setTimeout(()=>{
if (this.globals.loggedin==true) {}else {
   this.router.navigate(['/login']);
}
  }, 1000);
  }

}
