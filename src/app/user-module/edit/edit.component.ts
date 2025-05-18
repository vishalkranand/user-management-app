import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../user-details/User';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  editForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: User },
    private fb: FormBuilder,
    private sharedService: SharedService
  ) {
    this.editForm = this.fb.group({
      name: [data.user.name, Validators.required],
      email: [data.user.email, [Validators.required, Validators.email]],
      phoneNumber: [data.user.phoneNumber],
      gender: [data.user.gender || 'Male'],
    });
  }

  ngOnInit(): void {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.editForm.valid) {
      const updatedUser = {
        id: this.data.user.id,
        ...this.editForm.value,
      };

      const loggedInId = sessionStorage.getItem('id');
      const loggedInEmail = sessionStorage.getItem('email');
      if (loggedInId === updatedUser.id.toString()) {
        this.sharedService.setName(updatedUser.name);
      }

      if (loggedInEmail !== updatedUser.email) {
        sessionStorage.setItem('email', updatedUser.email);
      }

      this.dialogRef.close(updatedUser);
    }
  }
}
