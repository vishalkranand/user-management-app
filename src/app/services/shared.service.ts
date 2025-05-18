import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor() {}

  private currentNameSource = new BehaviorSubject<string | null>(
    sessionStorage.getItem('name')
  );
  currentName$ = this.currentNameSource.asObservable();

  setName(name: string): void {
    sessionStorage.setItem('name', name);
    this.currentNameSource.next(name);
  }
}
