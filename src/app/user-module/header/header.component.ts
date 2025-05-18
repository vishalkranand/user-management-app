import { Component, OnInit } from '@angular/core';
import { HEADER_CONSTANTS } from './header-constants';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { HttpStatusCode } from '@angular/common/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private route: Router,
    private sharedService: SharedService,
    private snackbar: SnackbarService
  ) {}
  name: string | null = '';
  toolbarConstants: any = HEADER_CONSTANTS;

  ngOnInit(): void {
    this.name = sessionStorage.getItem('name');
    this.sharedService.currentName$.subscribe((updatedName) => {
      if (updatedName) this.name = updatedName;
    });
  }

  logout() {
    sessionStorage.clear();
    this.snackbar.openSnackbar('Logged out successfully!', HttpStatusCode.Ok);
    this.route.navigateByUrl('login');
  }
}
