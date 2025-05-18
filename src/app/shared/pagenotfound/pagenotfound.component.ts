import { Component, OnInit } from '@angular/core';
import { PAGE_NOT_FOUND_CONSTANTS } from './page-not-found-constants';

@Component({
  selector: 'app-pagenotfound',
  templateUrl: './pagenotfound.component.html',
  styleUrls: ['./pagenotfound.component.scss'],
})
export class PagenotfoundComponent implements OnInit {
  constructor() {}
  pageNotFoundConstants: any = PAGE_NOT_FOUND_CONSTANTS;
  ngOnInit(): void {}
}
