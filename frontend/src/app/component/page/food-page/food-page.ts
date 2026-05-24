import { Component, inject, OnInit, signal } from '@angular/core';
import { Food } from '../../../shared/models/Food';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FoodService } from '../../../services/food';
import { NgFor, NgIf } from "@angular/common";
import { CartService } from '../../../services/cart';
import { Notfound } from '../../partials/notfound/notfound';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-food-page',
  imports: [NgFor, RouterLink, Notfound, NgIf],
  templateUrl: './food-page.html',
  styleUrl: './food-page.css',
})
export class FoodPage implements OnInit {
  food = signal<Food | undefined>(undefined);
  loading = signal(true);

  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private foodService = inject(FoodService);
  private cartService = inject(CartService);

  ngOnInit() {
    this.activatedRoute.params.pipe(
      switchMap((params) => {
        this.loading.set(true);
        this.food.set(undefined);
        return this.foodService.getFoodById(params['id']);
      })
    ).subscribe({
      next: (data) => {
        this.food.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.loading.set(false);
      },
    });
  }

  addToCard(): void {
    const selectedFood = this.food();
    if (!selectedFood) {
      return;
    }
    this.cartService.addToCart(selectedFood);
    this.router.navigateByUrl('/cart-page');
  }
}
