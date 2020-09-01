import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Custom Modules
import { MaterialModule } from '@modules/material/material.module';

// Shared Components
import { ModalGenComponent } from '@comp/shared/modal-gen/component/modal-gen.component';
import { FlexRowComponent } from '@comp/shared/flex-row/flex-row.component';
import { ColComponent } from '@comp/shared/col/col.component';
import { SidenavComponent } from '@comp/shared/sidenav/sidenav.component';
import { SidenavTreeComponent } from '@comp/shared/sidenav-tree/sidenav-tree.component';

// Page Components
import { IndexComponent } from '@comp/pages/index/index.component';
import { FormComponent } from './comp/pages/form/form.component';
import { LoginComponent } from './comp/pages/user/login/login.component';
import { LogoutComponent } from './comp/pages/user/logout/logout.component';
import { ConfigUsersComponent } from './comp/pages/config/config-users/config-users.component';
import { NotFoundComponent } from './comp/pages/not-found/not-found.component';
import { NewSystemComponent } from './comp/pages/user/new-system/new-system.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    FlexRowComponent,
    ColComponent,
    ModalGenComponent,
    FormComponent,
    LoginComponent,
    LogoutComponent,
    ConfigUsersComponent,
    NotFoundComponent,
    SidenavComponent,
    SidenavTreeComponent,
    NewSystemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
