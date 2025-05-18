import { HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss'],
})
export class RegisterUserComponent implements OnInit {
  registerForm!: FormGroup;
  hidePassword = true;
  genders: string[] = ['Male', 'Female', 'Others'];
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: Router,
    private snackService: SnackbarService
  ) {}
  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      phoneNumber: [
        '',
        [Validators.required, Validators.pattern(/^[0-9]{10}$/)],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.authService.userRegistration(this.registerForm.value).subscribe(
        () => {
          this.snackService.openSnackbar(
            'User registered successfully!',
            HttpStatusCode.Ok
          ),
            this.route.navigate(['/login']);
        },
        (error) => {
          console.error('Registration failed', error);
          this.snackService.openSnackbar(error.error, error.status);
        }
      );
    }
  }

  navigateToLogin(): void {
    this.route.navigate(['/login']);
  }

  navigateToAboutFivd(): void {
    window.location.href = 'https://fivd.io/Who%20We%20Are.html';
  }
}
