import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserCreds } from 'src/app/models/request/UserCreds';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { HttpStatusCode } from '@angular/common/http';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from 'src/app/services/shared.service';
import { ManageUsersService } from 'src/app/services/manage-users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  hidePassword = true;
  errorMesssage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: Router,
    private snackbarService: SnackbarService,
    private sharedService: SharedService,
    private userService: ManageUsersService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
    });
  }

  onLogin(): void {
    if (this.loginForm.invalid) return;

    const formValue = this.loginForm.value;
    const user = new UserCreds();
    user.email = formValue.email;
    user.login_password = formValue.password;

    this.authService.loginAuthentication(user).subscribe({
      next: (data) => this.handleSuccessResponse(data, formValue.email),
      error: (e) => this.handleErrorResponse(e),
    });
  }

  handleSuccessResponse(res: any, email: string): void {
    if (res?.token) {
      sessionStorage.setItem('email', email);
      sessionStorage.setItem('bearer_token', res.token);

      this.userService.getUserDetails().subscribe({
        next: (users: any) => {
          const user = users.find((u: any) => u.email === email);
          if (user) {
            sessionStorage.setItem('name', user.name);
            sessionStorage.setItem('id', user.id);
            this.sharedService.setName(user.name);
          }

          this.snackbarService.openSnackbar(
            'Successfully logged in!',
            HttpStatusCode.Ok
          );

          this.route.navigate(['/fivd/users']);
        },
        error: (err) => {
          console.error('Failed to fetch user details:', err);
          this.snackbarService.openSnackbar(
            'Error fetching user details',
            HttpStatusCode.BadRequest
          );
        },
      });
    } else {
      this.snackbarService.openSnackbar(
        'Invalid login response',
        HttpStatusCode.Unauthorized
      );
    }
  }

  handleErrorResponse(e: any): void {
    if (e.status === HttpStatusCode.Unauthorized) {
      this.snackbarService.openSnackbar(
        'Invalid email or password',
        HttpStatusCode.Unauthorized
      );
    } else {
      this.snackbarService.openSnackbar(
        'Something went wrong!',
        HttpStatusCode.BadRequest
      );
    }
  }

  navigateToRegister(): void {
    this.route.navigate(['/register']);
  }

  navigateToAboutFivd(): void {
    window.location.href = 'https://fivd.io/Who%20We%20Are.html';
  }
}
