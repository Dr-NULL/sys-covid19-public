import { MenuService, Menu } from '@services/menu/menu.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit, OnDestroy {
  private routerSub: Subscription;
  data: Menu[];

  constructor(
    private router: Router,
    private menuServ: MenuService
  ) { }

  ngOnInit(): void {
    this.routerSub = this.router.events.subscribe(this.update.bind(this));
  }

  ngOnDestroy(): void {
    this.routerSub.unsubscribe();
  }

  async update(event: Event): Promise<void> {
    if (!(event instanceof NavigationEnd)) {
      return;
    }

    try {
      const resp = await this.menuServ.get();
      this.data = resp.data;
    } catch (err) {
      console.log(err);
    }
  }
}
