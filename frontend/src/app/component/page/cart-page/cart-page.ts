import { Component, inject, signal } from '@angular/core';
import { Cart } from '../../../shared/models/Cart';
import { CartService } from '../../../services/cart';
import { CartItem } from '../../../shared/models/cartItem';
import { Title } from '../../partials/title/title';
import { NgForOf, NgIf } from "@angular/common";
import { RouterLink } from '@angular/router';
import { Notfound } from "../../partials/notfound/notfound";

@Component({
  selector: 'app-cart-page',
  imports: [Title, NgForOf, RouterLink, Notfound, NgIf],
  templateUrl: './cart-page.html',
  styleUrl: './cart-page.css',
})
export class CartPage {
  cart = signal<Cart>(new Cart());

  private cartService = inject(CartService);

  constructor() {
    this.cartService.getCartObservable().subscribe((cart) => {
      this.cart.set(cart);
    });
  }


removeFromCart(cartItem:CartItem){

  this.cartService.removeFromCard(cartItem.food.id);
}

changeQuantity(cartItem:CartItem,quantity:string){
  this.cartService.changeQuantity(cartItem.food.id,parseInt(quantity));

}


}
