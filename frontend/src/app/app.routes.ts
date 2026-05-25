import { Routes } from '@angular/router';
import { Home } from './component/page/home/home';
import { FoodPage } from './component/page/food-page/food-page';
import { CartPage } from './component/page/cart-page/cart-page';
import { Login } from './component/page/login/login';
import { RegisterPage } from './component/page/register-page/register-page';

export const routes: Routes = [
    {path:"",component:Home},
    {path:"search/:searchTerm",component:Home},
    {path:"food/:id",component:FoodPage},
    {path:"tag/:tag",component:Home},
    {path:"cart-page",component:CartPage},
    {path:"login",component:Login},
    {path:"register",component:RegisterPage}
];
