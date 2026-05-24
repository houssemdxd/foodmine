import { Component, inject, signal } from '@angular/core';
import { Tag } from '../../../shared/models/tag';
import { FoodService } from '../../../services/food';
import { NgIf, NgForOf } from "@angular/common";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tags',
  imports: [NgIf, NgForOf,RouterLink],
  templateUrl: './tags.html',
  styleUrl: './tags.css',
})
export class Tags {
  tags = signal<Tag[]>([]);

  constructor() {
    inject(FoodService).getAlltags().subscribe((server) => this.tags.set(server));
  }
}
