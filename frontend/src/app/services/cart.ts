import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Food } from '../shared/models/Food';
import {Cart } from "../shared/models/Cart";
import { CartItem } from '../shared/models/cartItem';

@Injectable({
  providedIn: 'root',
})
export class CartService {

private cart :Cart = this.getCardFromLocalStorage() ;
private cartSubbject :BehaviorSubject<Cart> = new BehaviorSubject<Cart>(this.cart);
constructor()
{

}
addToCart(food:Food)
{
  let cartItem = this.cart.items.find((item)=>{ return item.food.id==food.id})
if(cartItem)
{

 return ;
}
let newcard = new CartItem(food);
newcard.quantity=newcard.quantity+1;
this.cart.items.push(newcard);
this.setCartToLocalStorage();
}


removeFromCard(foodId:string):void {
this.cart.items = this.cart.items.filter((item)=>{return item.food.id!=foodId});
this.setCartToLocalStorage();

}

changeQuantity(foodId:string,newQuantity:number):void
{let cartItem = this.cart.items.find((item)=>{return item.food.id==foodId});
if(cartItem)
{
      cartItem.quantity = newQuantity;
      cartItem.price = newQuantity*cartItem.food.price;
this.setCartToLocalStorage();


}






}


clearCard()
{
  this.cart = new Cart();
this.setCartToLocalStorage();


}
getCartObservable():Observable<Cart>{

  return this.cartSubbject.asObservable();  
}

private setCartToLocalStorage()
{
this.cart.titalprice = this.cart.items.reduce((prevSum,currentSum)=> prevSum + currentSum.price,0);
this.cart.totalCount = this.cart.items.reduce((prev,curr)=>prev+curr.quantity,0);

const cartJson = JSON.stringify(this.cart);
console.log(cartJson)
localStorage.setItem('cart',cartJson);
this.cartSubbject.next(this.cart);

}

private getCardFromLocalStorage():Cart
{
const cartJson = localStorage.getItem('cart');
return cartJson?JSON.parse(cartJson) as Cart :new Cart();

}

}
