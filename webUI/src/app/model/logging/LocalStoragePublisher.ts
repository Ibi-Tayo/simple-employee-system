import { Observable, of } from 'rxjs';
import { LogPublisher } from './LogPublisher';

export class LocalStoragePublisher extends LogPublisher {
  location: string  = 'app-log';

  override log(message: string): Observable<boolean> {
    let ret: boolean = false;
    try {
      let timeStamp = new Date();
      localStorage.setItem(`${this.location} - ${timeStamp.toLocaleTimeString()}`, message);
      ret = true;
    } catch (ex) {
      console.log(ex);
    }
    return of(ret);
  }

  override clear(): Observable<boolean> {
    localStorage.clear();
    return of(true);
  }
}
