import { HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs";
import { ErrorMessage } from "../core/interfaces/errorMessage.interface";

export function handleErrorResponse(error: HttpErrorResponse) {
  let data: ErrorMessage = { status: error.status, message: error.error ? error.error.message : error.message }
  return throwError(() => data);
}
