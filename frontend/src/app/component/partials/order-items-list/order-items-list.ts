import { Component, Input } from '@angular/core';
import { Order } from '../../../shared/models/Ordet';
import {RouterLink} from "@angular/router";
import { NgFor } from '@angular/common';
@Component({
  selector: 'order-items-list',
  imports: [RouterLink, NgFor],
  templateUrl: './order-items-list.html',
  styleUrl: './order-items-list.css',
})
export class OrderItemsList {
  @Input()
  order!:Order;




}
