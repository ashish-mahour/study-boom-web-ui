import { Component } from '@angular/core';
import { routerInAnimation } from './shared/animations';
import {
  Router,
  Event as RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from '@angular/router'
import { TranslateService } from '@ngx-translate/core';
import * as config from './shared/config.json';
import { LoadingAnimServiceService } from './shared/loading/loading-anim-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routerInAnimation]
})
export class AppComponent {

  loading: boolean = true;

  constructor(private router: Router, translate: TranslateService, private loadingService: LoadingAnimServiceService) {
    router.events.subscribe((event: RouterEvent) => {
      this.routerNavigation(event)
    })

    /*
    * Default Language of Application
     */
    translate.setDefaultLang(config.defaultLanguage);

  }


  routerNavigation(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.loading = true
    }
    if (event instanceof NavigationEnd) {
      this.loading = false
    }
    if (event instanceof NavigationCancel) {
      this.loading = false
    }
    if (event instanceof NavigationError) {
      this.loading = false
    }
  }
}
