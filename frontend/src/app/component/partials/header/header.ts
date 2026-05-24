import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { CartService } from '../../../services/cart';
import { UserService } from '../../../services/user';
import { User } from '../../../shared/models/User';
import { NgIf } from "@angular/common";

@Component({
  selector: 'app-header',
  imports: [RouterLink, NgIf],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
quantity!:number;
user:User = new User();
constructor(private cartService:CartService,private userService:UserService){
cartService.getCartObservable().subscribe((deffCart)=>{this.quantity = deffCart.totalCount})
userService.userObservable?.subscribe(user=>this.user = user); 
console.log("user"+ JSON.stringify(this.user))


}

logout(){
  this.userService.logout();

}

} 