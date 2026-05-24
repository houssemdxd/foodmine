import { Food } from "./Food";

export class CartItem{


constructor(food:Food){
this.food=food;
this.price= food.price;
}


food!:Food;
quantity:number=0;
price!:number;

}