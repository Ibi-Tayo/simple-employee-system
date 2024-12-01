import { Injectable, signal, WritableSignal } from '@angular/core';
import { Message } from '../model/Message';

@Injectable({
  providedIn: 'root'
})
export class ToastService {


  ToastList: WritableSignal<Toast[]> = signal([]);

  addNewToast(toast: Toast): void {
    this.ToastList.update((list) => {
      list.push(toast);
      return list;
    });
  }

  removeToast(toast: Toast): void {
   this.ToastList.update((list) => list.filter(t => t !== toast));
  }

  clear(): void {
    this.ToastList.update((list) => list.splice(0, list.length));
  }
}

export interface Toast {
  message: string;
  classname: string;
  delay?: number;
}
