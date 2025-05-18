import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PagenotfoundComponent } from './shared/pagenotfound/pagenotfound.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { AuthGuard } from './components/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterUserComponent,
  },
  {
    path: 'fivd/users',
    loadChildren: () =>
      import('./user-module/user-module.module').then(
        (m) => m.UserModuleModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    component: PagenotfoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
