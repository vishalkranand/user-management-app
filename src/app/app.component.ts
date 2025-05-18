import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'user-management-app';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {}
}
