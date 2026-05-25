import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {

private readonly isLoadingSignal = signal(false);
readonly isLoading = this.isLoadingSignal.asReadonly();

showLoading(): void {
  this.isLoadingSignal.set(true);
}

hideLoading(): void {
  this.isLoadingSignal.set(false);
}

}
