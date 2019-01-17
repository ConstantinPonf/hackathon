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
    private closePopupService: ClosePopupService) {

    console.log("sub");
    this.subscriptionClose = this.closePopupService.getMessage().subscribe(message => { 
      console.log(message);
      switch(message.text){
        case 'close':{
          this.close();
        }
        case 'prepare':{
          this.scannedTrue = true;
        }
      }
    });
  }

  ngOnDestroy() {
    console.log("Unsubscribe POPUP")
    this.subscriptionClose.unsubscribe();
  }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }
}
