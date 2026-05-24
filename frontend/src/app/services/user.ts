import { Injectable } from '@angular/core';
import { User } from '../shared/models/User';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { IUserLogin } from '../shared/interfaces/IUserLogin';
import { HttpClient } from '@angular/common/http';
import { USER_LOGIN_URL } from '../shared/constant/urls';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class UserService {
private userSubject = new BehaviorSubject<User>(new User());
public userObservable?:Observable<User>;


constructor(public http:HttpClient,private toastr:ToastrService) {
  
this.userSubject.next(this.getUserFromLocalStorage());
this.userObservable = this.userSubject.asObservable();
}



login(userLogin:IUserLogin):Observable<User>{
  return this.http.post<User>(USER_LOGIN_URL, userLogin).pipe(tap( {
next:(user)=>{

  this.userSubject.next(user);
  this.toastr.success("Welcome to fOODMINE"+user.name,"Login successful");
  this.setUserToLocalStorage(user)
},
error:(err)=>{
  this.toastr.error("Login failed","Invalid email or password")
  
  alert(err.error)}


  }));
    
  
}


private setUserToLocalStorage(user:User){

let userstring = JSON.stringify(this.userSubject.value);
localStorage.setItem("user",userstring);

}
private getUserFromLocalStorage():User{

let userstring = localStorage.getItem("user");
if(userstring) return JSON.parse(userstring) as User;
return new User(); 
 }




 logout(){
  this.userSubject.next(new User());
  localStorage.removeItem("user");
  this.toastr.info("You have been logged out","Logout successful");
  window.location.reload();
 }
}

