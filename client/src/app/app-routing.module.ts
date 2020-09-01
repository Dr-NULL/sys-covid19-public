import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from '@comp/pages/index/index.component';
import { NotFoundComponent } from '@comp/pages/not-found/not-found.component';

import { LoginComponent } from '@comp/pages/user/login/login.component';
import { LogoutComponent } from '@comp/pages/user/logout/logout.component';
import { NewSystemComponent } from '@comp/pages/user/new-system/new-system.component';

import { FormComponent } from '@comp/pages/form/form.component';
import { ConfigUsersComponent } from '@comp/pages/config/config-users/config-users.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent
  },
  {
    path: '404',
    component: NotFoundComponent
  },
  {
    path: 'form',
    component: FormComponent
  },
  {
    path: 'user/login',
    component: LoginComponent
  },
  {
    path: 'user/logout',
    component: LogoutComponent
  },
  {
    path: 'user/system',
    component: NewSystemComponent
  },
  {
    path: 'config/users',
    component: ConfigUsersComponent
  },
  {
    path: '**',
    redirectTo: '404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
