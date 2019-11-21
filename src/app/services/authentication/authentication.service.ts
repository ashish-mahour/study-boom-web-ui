import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoadingAnimServiceService } from 'src/app/shared/loading/loading-anim-service.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  isAuthenticated: boolean = true;

  constructor(
    private loadingService: LoadingAnimServiceService,
    private http: HttpClient,
    private dialog: MatDialog
  ) { }
}
