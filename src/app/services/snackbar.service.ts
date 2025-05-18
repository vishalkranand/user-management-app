import { HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private snackbar: MatSnackBar) {}
  duration: number = 5000;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  openSnackbar(message: string, statusCode: HttpStatusCode) {
    let panelClass: string;
    if (statusCode >= 200 && statusCode < 300) {
      panelClass = 'success-snackbar'; // Applied this class for success messages
    } else if (statusCode >= 400 && statusCode < 600) {
      panelClass = 'error-snackbar'; // Applied this class for client errors
    } else {
      panelClass = 'unknown-error-snackbar'; // Applied this class for other errors
    }
    this.snackbar.open(message, 'Close', {
      duration: this.duration,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: [panelClass],
    });
  }
}
