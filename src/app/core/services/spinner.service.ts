import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  public isLoading$ = new BehaviorSubject<boolean>(false);

  constructor() { }


  public show(): void {
    this.isLoading$.next(true);
  }
  public hide(): void {
    this.isLoading$.next(false);
  }
}
