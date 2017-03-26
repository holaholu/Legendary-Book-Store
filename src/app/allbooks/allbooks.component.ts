import { Component, OnInit } from '@angular/core';
import { Globals } from '../globals';
import {Router} from '@angular/router';
import { BooksService } from '../books.service';

@Component({
  selector: 'app-allbooks',
  templateUrl: './allbooks.component.html',
  styleUrls: ['./allbooks.component.css']
})
export class AllbooksComponent implements OnInit {
allbooks;errorMsg;

 add(i){

   //Update book with new owner
 this.booksService.borrow(this.allbooks[i]._id)
       .subscribe(res => {
      this.allbooks = res, posterror => this.errorMsg=posterror ;});
//Re- render library page
this.booksService.findall("Library","false")
       .subscribe(res => {
      this.allbooks = res, posterror => this.errorMsg=posterror ;});
 }





  constructor(private globals: Globals,private router: Router,private booksService: BooksService) { }

  ngOnInit() {

 this.booksService.findall("Library","false")
       .subscribe(res => {
      this.allbooks = res, posterror => this.errorMsg=posterror ;});



    setTimeout(()=>{
if (this.globals.loggedin==true) {}else {
   this.router.navigate(['/login']);
}

console.log(this.allbooks)
  }, 1000);
    
   }
  }


