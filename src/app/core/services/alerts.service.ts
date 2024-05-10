import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  constructor(private _snackBar: MatSnackBar) { }


  public Success(_message: string) {
    if (_message) {
      this._snackBar.open(_message, 'x', {
        duration: 5000,
        verticalPosition: 'top',
        panelClass: ['success-alert']
      });
    }
  }

  public Error(_message: string) {
    if (_message) {
      this._snackBar.open(_message, 'x', {
        duration: 5000,
        verticalPosition: 'top',
        panelClass: ['error-alert']
      });
    }
  }

  public Info(_message: string) {
    if (_message) {
      this._snackBar.open(_message, 'x', {
        duration: 5000,
        verticalPosition: 'top',
        panelClass: ['info-alert']
      });
    }
  }
}
