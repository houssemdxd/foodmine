import { Component, Input, OnInit } from '@angular/core';
import { NgStyle } from '@angular/common';
@Component({
  selector: 'input-container',
  templateUrl: './input-container.html',
  styleUrls: ['./input-container.css'],
  imports: [NgStyle]
})
export class InputContainerComponent implements OnInit {

  @Input()
  label!:string;
  @Input()
  bgColor = 'white';

  constructor() { }

  ngOnInit(): void {
  }

}