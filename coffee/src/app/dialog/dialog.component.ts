import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { CloseDialogService } from '../shared/closeDialog-service';
import { Subscription } from 'rxjs';
import { ChangePopupTextService } from '../shared/changePopupText-service';
import { ClosePopupService } from '../shared/closePopup-service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit, OnDestroy {

  message: any;
  subscription: Subscription;

  message2: any;
  subscription2: Subscription;
  scannedTrue = false;

  messageClose: any;
  subscriptionClose: Subscription;

  constructor(private dialogRef: MatDialogRef<DialogComponent>,
    private closeDialogService: CloseDialogService,
    private changePopupText: ChangePopupTextService,
    private closePopupService: ClosePopupService) {

    console.log("sub 1");
    this.subscription = this.closeDialogService.getMessage().subscribe(message => {
      this.message = message;
    });
    console.log("sub 2");
    this.subscription2 = this.changePopupText.getMessage().subscribe(message => {
      this.message2 = message;
      this.scannedTrue = true;
    });
    console.log("sub 3");
    this.subscriptionClose = this.closePopupService.getMessage().subscribe(message => {
      console.log("I am called! MSG: " + message.text );
      if (message.text === 'close') {
        console.log("CLOSE")
        this.close();
      }
    });
  }

  ngOnDestroy() {
    console.log("Unsubscribe POPUP")
    this.subscription.unsubscribe();
    this.subscription2.unsubscribe();
    this.subscriptionClose.unsubscribe();
  }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }
}
