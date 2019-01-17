import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {CloseDialogService} from '../shared/closeDialog-service';
import {Subscription} from 'rxjs';
import {ChangePopupTextService} from '../shared/changePopupText-service';
import {BrewedCoffeeService} from '../shared/brewedCoffee-service';

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

  constructor(private dialogRef: MatDialogRef<DialogComponent>, private closeDialogService: CloseDialogService,
              private changePopupText: ChangePopupTextService, brewedCoffeeService: BrewedCoffeeService) {

    this.subscription = this.closeDialogService.getMessage().subscribe(message => {
      this.message = message;
      setTimeout(() => {
          this.close();
        },
        5000);
    });

    this.subscription2 = this.changePopupText.getMessage().subscribe( message => {
      this.message2 = message;
      this.scannedTrue = true;
      setTimeout(() => {
          brewedCoffeeService.coffeeBrewed(true);
          this.scannedTrue = false;
          this.close();
        },
        5000);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.subscription2.unsubscribe();
  }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }

}
