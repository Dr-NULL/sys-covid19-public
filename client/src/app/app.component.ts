import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, Event, NavigationStart, RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { routingAnime } from '@tool/animations/route-state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [ routingAnime ]
})
export class AppComponent implements OnInit, OnDestroy {
  private routerSubs: Subscription;
  showMenu = false;

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {
    this.routerSubs = this.router
      .events
      .subscribe(this.load.bind(this));
  }

  ngOnDestroy(): void {
    this.routerSubs.unsubscribe();
  }

  load(event: Event): void {
    if (!(event instanceof NavigationStart)) {
      return;
    }

    this.showMenu = false;
  }

  routeChange(outlet: RouterOutlet): any {
    if (outlet.isActivated) {
      return outlet.activatedRouteData;
    }
  }
}
