import { Component, OnInit, OnDestroy, Query } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

import { UserService } from '@services/user/user.service';
import * as CustomVal from '@tool/validators';
import { ModalGenService } from '@comp/shared/modal-gen';
import { MatSnackBar } from '@angular/material/snack-bar';

interface Data {
  nick: string;
  pass: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  private routerSub: Subscription;
  formGroup: FormGroup;

  constructor(
    private router: Router,
    private userServ: UserService,
    private formServ: FormBuilder,
    private snackServ: MatSnackBar,
    private modalGenServ: ModalGenService,
    private currentRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.routerSub = this.currentRoute.paramMap.subscribe(this.routeCheck.bind(this));
    this.formGroup = this.formServ.group({
      nick: [ null, CustomVal.User.nick ],
      pass: [ null, CustomVal.User.pass(false) ]
    });
  }

  ngOnDestroy(): void {
    this.routerSub.unsubscribe();
  }

  async routeCheck(): Promise<void> {
    const resp = await this.userServ.systemCheck();
    if (!resp.data) {
      this.router.navigate([ 'user/system' ]);
    }
  }

  async onsubmit(): Promise<void> {
    try {
      const data = this.formGroup.value as Data;
      await this.userServ.login(data.nick, data.pass);

      this.snackServ.open('Sesión Iniciada correctamente', 'OK', { duration: 3000 });
      this.router.navigate([ 'form' ]);
    } catch (err) {
      const modal = this.modalGenServ.create('md');
      modal.title = 'Error!';
      modal.body = err.message;

      modal.open();
      this.formGroup.reset();
    }
  }
}
