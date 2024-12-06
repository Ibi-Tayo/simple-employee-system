import { Observable, of } from "rxjs";
import { LogLevel } from "../../services/logging.service";
import { LogPublisher } from "./LogPublisher";

export class LocalStoragePublisher extends LogPublisher {

  override log(message: string, level: LogLevel): Observable<boolean> {
    throw new Error("Method not implemented.");
  }

  override clear(): Observable<boolean> {
    throw new Error("Method not implemented.");
  }

}
