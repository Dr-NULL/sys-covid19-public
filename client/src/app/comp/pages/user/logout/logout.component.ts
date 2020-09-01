import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from '@services/user/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {
  private routerSubs: Subscription;

  constructor(
    private router: Router,
    private userServ: UserService,
    private activeRouter: ActivatedRoute,
    private snackServ: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.routerSubs = this.activeRouter.paramMap.subscribe(this.start.bind(this));
  }

  nrOnDestroy(): void {
    this.routerSubs.unsubscribe();
  }

  async start(): Promise<void> {
    try {
      await this.userServ.logout();
    } catch (err) {
      this.snackServ.open(
        err.message,
        'OK',
        {
          duration: 3000
        }
      );
    } finally {
      this.router.navigate([ '' ]);
    }
  }
}
