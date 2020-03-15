import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingAnimServiceService {

  loading: boolean = false;
  text: string = ""
  progress: number

  constructor(
  ) { }

  showLoading(loadingValue: boolean, text: string, progress?: number) {
    setTimeout(() => {
      this.loading = loadingValue;
      this.text = text;
      this.progress = progress
    }, 0)
  }
}
