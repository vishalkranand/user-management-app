import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserModuleRoutingModule } from './user-module-routing.module';
import { UserDetailsComponent } from './user-details/user-details.component';
import { AppModule } from '../app.module';
import { HeaderComponent } from './header/header.component';
import { MaterialModule } from '../shared/material-ui/material-ui.module';
import { ConfirmComponent } from './confirm/confirm.component';
import { EditComponent } from './edit/edit.component';

@NgModule({
  declarations: [UserDetailsComponent, HeaderComponent, ConfirmComponent, EditComponent],
  imports: [CommonModule, UserModuleRoutingModule, MaterialModule],
})
export class UserModuleModule {}
