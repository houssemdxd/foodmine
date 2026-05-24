import { Component, inject, signal } from '@angular/core';
import { Food } from '../../../shared/models/Food';
import { FoodService } from '../../../services/food';
import { NgFor } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SearchComponent } from '../../partials/search-component/search-component';
import { Tags } from '../../partials/tags/tags';
import { Notfound } from "../../partials/notfound/notfound";
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [NgFor, RouterLink, SearchComponent, Tags, Notfound],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  foods = signal<Food[]>([]);

  private foodService = inject(FoodService);
  private activatedRoute = inject(ActivatedRoute);

  constructor() {
    this.activatedRoute.params.pipe(
      switchMap((params) => {
        if (params['searchTerm']) {
          return this.foodService.getAllFoodBySearchTerm(params['searchTerm']);
        }
        if (params['tag']) {
          return this.foodService.getAllFoodsByTag(params['tag']);
        }
        return this.foodService.getAll();
      })
    ).subscribe((serverFoods) => {
      this.foods.set(serverFoods);
    });
  }
}
