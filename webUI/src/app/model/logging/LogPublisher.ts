import { Observable } from "rxjs";
import { LogLevel } from "../../services/logging.service";

export abstract class LogPublisher {
  abstract log(message: string, level: LogLevel): Observable<boolean>
  abstract clear(): Observable<boolean>
}
