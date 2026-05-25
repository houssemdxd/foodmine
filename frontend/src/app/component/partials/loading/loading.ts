import { Component, inject } from '@angular/core';
import { LoadingService } from '../../../services/loading';
import { NgIf } from "@angular/common";

@Component({
  selector: 'app-loading',
  imports: [NgIf],
  templateUrl: './loading.html',
  styleUrl: './loading.css',
})
export class Loading {

  readonly isLoading = inject(LoadingService).isLoading;
}
