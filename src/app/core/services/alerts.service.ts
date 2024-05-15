import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorMessage } from '../interfaces/errorMessage.interface';


@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  constructor(private _snackBar: MatSnackBar) { }

  public ShowMessage(data: ErrorMessage): void {
    const message: Record<number, () => void> = {
      500: () => {
        this.Error(data.message)
      },
      404: () => {
        this.Info(data.message)
      },
      400: () => {
        this.Info(data.message)
      },
      0: () => {
        this.Error(data.message)
      },
    };
    const handler = message[data.status];
    if (handler) {
      handler();
    }

  }

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
