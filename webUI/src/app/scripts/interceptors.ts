import { HttpErrorResponse, HttpEvent, HttpEventType, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { catchError, Observable, tap, throwError } from "rxjs";
import { LoggingService } from "../services/logging.service";
import { inject } from "@angular/core";


export function loggingInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const logger = inject(LoggingService);
  logger.info(`Request sent to ${req.url} with method ${req.method}`);
  const startTime: Date = new Date();

  return next(req).pipe(
    tap(ev => {
      if (ev.type === HttpEventType.Response) {
        let responseTime = (new Date().valueOf() - startTime.valueOf()) / 1000
        const resMessage = `Response received (in ${responseTime}secs) from ${req.method} method (${req.url}) with status ${ev.status}`;
        ev.ok ? logger.info(resMessage) : logger.error(resMessage);
      }
    }),
    catchError((error: HttpErrorResponse) => {
      const errorMessage = `Request to ${req.url} failed with error: ${error.message}`;
      logger.error(errorMessage);
      return throwError(() => error);
    })
  );
}
