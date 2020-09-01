import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { ModalGenService } from '@comp/shared/modal-gen';
import { UserService } from '@services/user/user.service';
import * as CustomVals from '@tool/validators';
import { Rut } from '@tool/other/rut';

interface Data {
  rut: string;
  mail: string;
  nick: string;
  pass: string;
}

@Component({
  selector: 'app-new-system',
  templateUrl: './new-system.component.html',
  styleUrls: ['./new-system.component.scss']
})
export class NewSystemComponent implements OnInit, OnDestroy {
  private routerSub: Subscription;
  formGroup: FormGroup;

  constructor(
    private router: Router,
    private userServ: UserService,
    private formServ: FormBuilder,
    private snackServ: MatSnackBar,
    private currentRoute: ActivatedRoute,
    private modalGenServ: ModalGenService,
  ) { }

  ngOnInit(): void {
    this.routerSub = this.currentRoute.paramMap.subscribe(this.routeCheck.bind(this));
    this.formGroup = this.formServ.group({
      rut:  [ null, CustomVals.Employee.rut ],
      mail: [ null, [ Validators.email, Validators.required ] ],
      nick: [ null, CustomVals.User.nick ],
      pass: [ null, CustomVals.User.pass(false) ]
    });
  }

  ngOnDestroy(): void {
    this.routerSub.unsubscribe();
  }

  async routeCheck(): Promise<void> {
    const resp = await this.userServ.systemCheck();
    if (resp.data) {
      this.router.navigate([ '404' ]);
    }
  }

  // Lógica formulario
  onRUTChange(): void {
    const ctrl = this.formGroup.controls.rut;
    let value = ctrl.value as string;

    value = Rut.format(value);
    ctrl.setValue(value);
  }

  async onSubmit(): Promise<void> {
    try {
      const data = this.formGroup.value as Data;
      await this.userServ.systemAdd(
        data.rut,
        data.mail,
        data.nick,
        data.pass
      );

      this.snackServ.open('Usuario "system", creado correctamente!', 'OK', { duration: 3000 });
      this.router.navigate([ 'user/login' ]);
    } catch (err) {
      const modal = this.modalGenServ.create('md');
      modal.body = err.message;
      modal.open();
    }
  }
}
