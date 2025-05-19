import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ManageUsersService } from 'src/app/services/manage-users.service';
import { User } from './User';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../confirm/confirm.component';
import { EditComponent } from '../edit/edit.component';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { HttpStatusCode } from '@angular/common/http';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent implements OnInit {
  users: User[] = [];
  dataSource!: MatTableDataSource<User>;
  displayedColumns: string[] = [
    'select',
    'name',
    'email',
    'phone',
    'gender',
    'registrationDate',
    'updatedOn',
    'actions',
  ];
  selection = new SelectionModel<User>(true, []);
  selectedUsers: User[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  loggedInEmail: string | null = '';

  constructor(
    private userService: ManageUsersService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private snackbar: SnackbarService
  ) {}

  ngOnInit(): void {
    this.loggedInEmail = sessionStorage.getItem('email');
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUserDetails().subscribe({
      next: (users: any) => {
        this.users = users;
        this.dataSource = new MatTableDataSource<User>(this.users);
        this.dataSource.paginator = this.paginator;
        this.snackbar.openSnackbar(
          'Fetched users successfully!',
          HttpStatusCode.Ok
        );
      },
      error: (err) => {
        console.error('Error loading users:', err);
        this.snackbar.openSnackbar(err.error, err.status);
      },
    });
  }

  formatDate(date: Date | undefined): string {
    if (!date) return 'Never';
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  }

  getGenderIcon(gender: string): string {
    switch (gender.toLowerCase()) {
      case 'male':
        return 'male';
      case 'female':
        return 'female';
      default:
        return 'person';
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
    this.updateSelectedUsers();
    this.cdr.detectChanges();
  }

  onSelectionChange() {
    this.updateSelectedUsers();
  }

  updateSelectedUsers() {
    this.selectedUsers = this.selection.selected;
  }

  deleteSelectedUsers() {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '350px',
      data: {
        title: 'Confirm Delete',
        message: `Are you sure you want to delete ${this.selectedUsers.length} selected users?`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const idsToDelete = this.selectedUsers.map((user) => user.id);
        this.userService.deleteMultipleUsers(idsToDelete).subscribe({
          next: () => {
            this.users = this.users.filter(
              (user) => !idsToDelete.includes(user.id)
            );
            this.dataSource.data = [...this.users];
            this.cdr.detectChanges();
            this.selection.clear();
            this.selectedUsers = [];
            this.snackbar.openSnackbar(
              'Deleted users successfully!',
              HttpStatusCode.Ok
            );
          },
          error: (err: any) => {
            console.error('Error deleting users:', err);
            this.snackbar.openSnackbar(err.error, err.status);
          },
        });
      }
    });
  }

  deleteUser(user: User) {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '350px',
      data: {
        title: 'Confirm Delete',
        message: `Are you sure you want to delete user ${user.name}?`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.userService.deleteUser(user.id).subscribe({
          next: () => {
            this.users = this.users.filter((u) => u.id !== user.id);
            this.dataSource.data = [...this.users];
            this.snackbar.openSnackbar(
              'Deleted user successfully!',
              HttpStatusCode.Ok
            );
            this.cdr.detectChanges();
          },
          error: (err: any) => {
            this.snackbar.openSnackbar(err.error, err.status);
            console.error('Error deleting user:', err);
          },
        });
      }
    });
  }

  editUser(user: User) {
    const dialogRef = this.dialog.open(EditComponent, {
      width: '500px',
      data: { user: { ...user } },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.id) {
        const userId = result.id;
        const updatedData = { ...result };
        delete updatedData.id;

        this.userService.updateUser(userId, updatedData).subscribe({
          next: (response: any) => {
            const updatedUser = response.user;
            const index = this.users.findIndex((u) => u.id === updatedUser.id);
            if (index !== -1) {
              this.users[index] = updatedUser;
              this.dataSource.data = [...this.users];
              this.snackbar.openSnackbar(
                'Updated user successfully!',
                HttpStatusCode.Ok
              );
            }
          },
          error: (err: any) => {
            this.snackbar.openSnackbar(err.error, err.status);
            console.error('Error updating user:', err);
          },
        });
      }
    });
  }
}
