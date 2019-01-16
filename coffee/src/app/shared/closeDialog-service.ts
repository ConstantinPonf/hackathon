import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

/** This service is used to interact with messages from the toolbar component to the miner view
 * component.  **/
@Injectable({ providedIn: 'root' })
export class CloseDialogService {
  private subject = new Subject<any>();

  sendMessage(message: string) {
    this.subject.next({ text: message });
  }

  clearMessage() {
    this.subject.next();
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }
}
