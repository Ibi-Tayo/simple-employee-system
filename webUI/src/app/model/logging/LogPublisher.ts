import { Observable } from "rxjs";
import { LogLevel } from "../../services/logging.service";

export abstract class LogPublisher {
  location: string | undefined;
  abstract log(message: string, level: LogLevel): Observable<boolean>
  abstract clear(): Observable<boolean>
}
