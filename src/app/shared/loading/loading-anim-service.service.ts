import { Injectable  } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingAnimServiceService {

  loading: boolean = false;

  constructor() { }

  showLoading(loadingValue: boolean) {
    this.loading = loadingValue;
  }
}
