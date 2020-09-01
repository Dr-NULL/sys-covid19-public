import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { ModalGenService } from '@comp/shared/modal-gen';
import { TypeUserService } from '@services/type-user/type-user.service';
import { MenuService } from '@services/menu/menu.service';
import { UserService } from '@services/user/user.service';
import { TypeUser } from '@models/type-user';
import { User } from '@models/user';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Rut } from '@tool/other/rut';
import * as CustomVals from '@tool/validators';
import { trigger, transition, style, animation, animate } from '@angular/animations';

interface Data {
  rut: string;
  mail: string;
  nick: string;
  pass: string;
  type: number;
}

@Component({
  selector: 'app-config-users',
  templateUrl: './config-users.component.html',
  styleUrls: ['./config-users.component.scss']
})
export class ConfigUsersComponent implements OnInit, OnDestroy {
  routerSubs: Subscription;

  formGroup: FormGroup;
  types: TypeUser[] = [];
  users: User[] = [];
  display = [
    'rut',
    'mail',
    'type',
    'nick',
    'kill'
  ];

  constructor(
    private router: Router,
    private routerActive: ActivatedRoute,
    private formBuilder: FormBuilder,
    private modalGenServ: ModalGenService,
    private snackServ: MatSnackBar,
    private menuServ: MenuService,
    private userServ: UserService,
    private typeUserServ: TypeUserService
  ) { }

  ngOnInit(): void {
    this.routerSubs = this.routerActive
      .paramMap
      .subscribe(this.load.bind(this));

    // Create form
    this.formGroup = this.formBuilder.group({
      rut:  [ null, [ CustomVals.Employee.rut, , Validators.required] ],
      mail: [ null, [ Validators.email, Validators.required ] ],
      nick: [ null, CustomVals.User.nick ],
      pass: [ null, CustomVals.User.pass(false) ],
      type: [ null, Validators.required ]
    });
  }

  ngOnDestroy(): void {
    this.routerSubs.unsubscribe();
  }

  /**
   * Mostrar un modal genérico en caso de error.
   * @param err instancia de objeto error (sirve el brindado por un try/catch).
   */
  onError(err: any): void {
    const modal = this.modalGenServ.create('md');
    modal.title = 'Error!';
    modal.body = err.message;
    modal.open();
  }

  async load(): Promise<void> {
    try {
      await this.menuServ.check();
      const typeResp = await this.typeUserServ.get();
      const userResp = await this.userServ.get();
      this.types = typeResp.data;
      this.users = userResp.data;

    } catch (err) {
      this.onError(err);
      this.router.navigate([ '' ]);
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
      await this.userServ.add(
        data.rut,
        data.mail,
        data.nick,
        data.pass,
        data.type
      );

      this.snackServ.open('Usuario creado correctamente!', 'OK', { duration: 3000 });
      this.formGroup.reset();
      this.load();
    } catch (err) {
      this.onError(err);
    }
  }

  async onKill(id: number): Promise<void> {
    try {
      await this.userServ.delete(id);
      this.snackServ.open(
        'El usuario ha sido eliminado correctamente.',
        'OK',
        { duration: 3000 }
      );

      this.load();
    } catch (err) {
      this.onError(err);
    }
  }
}
