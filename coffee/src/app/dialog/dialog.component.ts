import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {CloseDialogService} from '../shared/closeDialog-service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  message: any;
  subscription: Subscription;

  constructor(private dialogRef: MatDialogRef<DialogComponent>, private closeDialogService: CloseDialogService) {
    this.subscription = this.closeDialogService.getMessage().subscribe(message => {
      this.message = message;
      setTimeout(() => {
          this.close();
        },
        5000);
    });
  }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }

}
