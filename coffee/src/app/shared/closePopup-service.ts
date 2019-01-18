import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

/** This service is used to interact with messages from the toolbar component to the miner view
 * component.  **/
@Injectable({ providedIn: 'root' })
export class ClosePopupService {
  private subject = new BehaviorSubject<any>([]);

  sendMessage(message: string) {
    this.subject.next({ text: message });
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }
}
