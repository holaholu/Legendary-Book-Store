import { Injectable } from '@angular/core';
import { Http,Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class BooksService {

  constructor(private http: Http) { }

  // Sign user up and return username
  signUp(name,password,email) {
    return this.http.post('/signup',{username:name,email:email,password:password})
      .map(res => res.text()).catch(this._errorHandler);
  }
  //?username='+myEmail+"&password="+myPassword+"&name="+myName
  logIn(name,password) {
    return this.http.post('/login',{username:name,password:password})
      .map(res => res.text()).catch(this._errorHandler);
  }
//?username='+myEmail+"&password="+myPassword
  getUser() {
    return this.http.get('/getuser')
      .map(res => res.text()).catch(this._errorHandler);
  }

  settings1(password){
    return this.http.post('/settings1',{password:password})
      .map(res => res.text()).catch(this._errorHandler);
  }
  settings2(city,state){
   
    return this.http.post('/settings2',{city:city,state:state})
      .map(res => res.text()).catch(this._errorHandler);
  }

  findall(owner,status){
     return this.http.post('/findall',{owner:owner,status:status})
      .map(res => res.json()).catch(this._errorHandler);
  }

  borrow(id){
     return this.http.post('/borrow',{id:id})
      .map(res => res.json()).catch(this._errorHandler);
  }

  claimtrade(id){
    return this.http.post('/claimtrade',{id:id})
      .map(res => res.json()).catch(this._errorHandler);

  }

  findtrade(){
     return this.http.get('/findtrade')
      .map(res => res.json()).catch(this._errorHandler);
  }

  trade(id){
     return this.http.post('/trade',{id:id})
      .map(res => res.json()).catch(this._errorHandler);
  }

   return(id){
     return this.http.post('/return',{id:id})
      .map(res => res.json()).catch(this._errorHandler);
  }

 _errorHandler(error:Response){
          console.error(error);
          return Observable.throw(error || "Server Error");
      }

}
