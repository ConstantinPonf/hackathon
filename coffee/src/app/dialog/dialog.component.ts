import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Subscription } from 'rxjs';
import { ClosePopupService } from '../shared/closePopup-service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit, OnDestroy {

  scannedTrue = false;
  subscriptionClose: Subscription;

  constructor(private dialogRef: MatDialogRef<DialogComponent>,
    private closePopupService: ClosePopupService) {

    console.log('sub');
    this.subscriptionClose = this.closePopupService.getMessage().subscribe(message => {
      console.log(message);
      switch (message.text) {
        case 'close': {
          this.close();
          break;
        }
        case 'prepare': {
          this.scannedTrue = true;
          break;
        }
      }
    });
  }

  ngOnDestroy() {
    console.log('Unsubscribe POPUP');
    this.subscriptionClose.unsubscribe();
  }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }
}
