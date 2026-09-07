import { Component, OnInit, signal } from '@angular/core';
import { Order } from '../../../shared/models/Ordet';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../../services/user';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../../services/cart';
import { Title } from "../../partials/title/title";
import { TextInputComponent } from "../../partials/text-input/text-input";
import { OrderItemsList } from "../../partials/order-items-list/order-items-list";

@Component({
  selector: 'app-checkout-page',
  imports: [Title, ReactiveFormsModule, TextInputComponent, OrderItemsList],
  templateUrl: './checkout-page.html',
  styleUrls: ['./checkout-page.css'],
})
export class CheckoutPage implements OnInit{
order = signal<Order>(new Order());

checkoutForm!:FormGroup;
constructor(

    cartService:CartService,
    private formBuilder:FormBuilder,
  private userService:UserService,
  private toastr:ToastrService
){

const cart = cartService.getCart();
this.order().items = cart.items;
this.order().totalPrice = cart.titalprice;
console.log(this.order());


} 
  ngOnInit(): void {
let {name,address} = this.userService.CurrentUser; 
console.log("thisis the name of the user "+name)
this.checkoutForm = this.formBuilder.group({
name:[name,Validators.required],
address:[address,Validators.required],
})
  }


get fc(){
  return this.checkoutForm.controls;
}

createOrder(){
  if(this.checkoutForm.invalid) {
    this.toastr.warning("Please fill the inputs", "Invalid Input");
    return;
  }

  this.order().name = this.fc["name"].value;
  this.order().address = this.fc["address"].value;
  this.toastr.success("Order created successfully","Success");
  console.log(this.order);
}



}
