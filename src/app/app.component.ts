import { Component } from "@angular/core";
import { routerInAnimation } from "./shared/animations";
import {
  Router,
  Event as RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import * as config from "./shared/config.json";
import { LoadingAnimServiceService } from "./shared/loading/loading-anim-service.service";
import { AuthenticationService } from './services/authentication/authentication.service';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  animations: [routerInAnimation]
})
export class AppComponent {
  loading: boolean = true;

  constructor(
    private router: Router,
    translate: TranslateService,
    private loadingService: LoadingAnimServiceService,
    private authenticationService: AuthenticationService
  ) {
    router.events.subscribe((event: RouterEvent) => {
      this.routerNavigation(event);
    });

    /*
     * Default Language of Application
     */
    translate.setDefaultLang(config.defaultLanguage);
  }

  routerNavigation(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.authenticationService.userDetails = JSON.parse(localStorage.getItem("userDetails"))
      this.authenticationService.isAuthenticated = JSON.parse(localStorage.getItem("isAuthenticated"))
      this.authenticationService.userType = localStorage.getItem("userType")
      this.loadingService.showLoading(true)
    }
    if (event instanceof NavigationEnd) {
      this.loadingService.showLoading(false)
    }
    if (event instanceof NavigationCancel) {
      this.loadingService.showLoading(false)
    }
    if (event instanceof NavigationError) {
      this.loadingService.showLoading(false)
    }
  }
}
