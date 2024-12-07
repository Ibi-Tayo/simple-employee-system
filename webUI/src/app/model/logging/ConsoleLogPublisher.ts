import { Observable, of } from 'rxjs';
import { LogLevel } from '../../services/logging.service';
import { LogPublisher } from './LogPublisher';

export class ConsoleLogPublisher extends LogPublisher {

  override log(message: string, level: LogLevel): Observable<boolean> {
    switch (level) {
      case LogLevel.INFO:
        console.info(message);
        return of(true);

      case LogLevel.WARNING:
        console.warn(message);
        return of(true);

      case LogLevel.ERROR:
        console.error(message);
        return of(true);

      default:
        return of(false);
    }
  }

  override clear(): Observable<boolean> {
    console.clear();
    return of(true);
  }
}
