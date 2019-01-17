import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ChangePopupTextService {
  private subject = new BehaviorSubject<any>([]);

  sendMessage(message: string) {
    this.subject.next({ text: message });
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }
}
