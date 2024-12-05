import { HttpEvent, HttpEventType, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { Observable, tap } from "rxjs";

export function loggingInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
    console.log(`Request sent to ${req.url} with method ${req.method}`);
    return next(req)
        .pipe(
            tap(ev => {
                if (ev.type === HttpEventType.Response) {
                    console.log(`Response received from ${req.url} with status ${ev.status}`);
                }
            })
        )
}