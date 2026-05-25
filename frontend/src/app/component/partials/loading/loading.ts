import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../../../services/loading';
import { NgIf } from "@angular/common";

@Component({
  selector: 'app-loading',
  imports: [NgIf],
  templateUrl: './loading.html',
  styleUrl: './loading.css',
})
export class Loading implements OnInit{

  isLoading!:boolean;

  constructor(private loadingService: LoadingService) {

    this.loadingService.isLoadingObservable.subscribe((isloading)=>{
      this.isLoading = isloading;
    })

   }

  ngOnInit(): void {

  }


}
