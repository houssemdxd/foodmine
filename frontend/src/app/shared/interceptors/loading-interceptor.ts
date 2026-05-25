import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoadingService } from '../../services/loading';
import { finalize } from 'rxjs/operators';

let pendingRequest = 0;

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);

  pendingRequest++;

  if (pendingRequest === 1) {
    loadingService.showLoading();
  }

  return next(req).pipe(
    finalize(() => {
      pendingRequest = Math.max(pendingRequest - 1, 0);

      if (pendingRequest === 0) {
        loadingService.hideLoading();
      }
    })
  );
};