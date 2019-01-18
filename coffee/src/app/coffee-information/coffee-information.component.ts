import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {DialogComponent} from '../dialog/dialog.component';
import {CloseDialogService} from '../shared/closeDialog-service';
import {ChipScannedService} from '../shared/chipScanned-service';
import {ChangePopupTextService} from '../shared/changePopupText-service';

export interface CoffeeSorts {
  id: number;
  thumbnail: string;
  name: string;
  description: string;
  price: number;
}

const ELEMENT_DATA: CoffeeSorts[] = [
  // TODO: Thumbnails ablegen.
  {id: 1,
    thumbnail: 'https://www.nespresso.com/ecom/medias/sys_master/public/10386856312862/C-0004-2000x2000.png?impolicy=product&imwidth=65',
    name: 'Espresso Cosi', description: 'Fruity', price: 1},
  {id: 2,
    thumbnail: 'https://www.nespresso.com/ecom/medias/sys_master/public/10386857492510/C-0023-2000x2000.png?impolicy=product&imwidth=65',
    name: 'Ristretto', description: 'Powerful and Contrasting', price: 1},
  {id: 3,
    thumbnail:
      'https://www.nespresso.com/ecom/medias/sys_master/public/10840367792158/C-0359-India-2000x2000.png?impolicy=product&imwidth=65',
    name: 'Master Origin India', description: 'Intense and Spicy', price: 1},
  {id: 4,
    thumbnail:
      'https://www.nespresso.com/ecom/medias/sys_master/public/10820727865374/C-0360-Indonesia-2000x2000.png?impolicy=product&imwidth=65',
    name: 'Master Origin Indonesia', description: 'Rich, with woody notes', price: 1},
  {id: 5,
    thumbnail:
      'https://www.nespresso.com/ecom/medias/sys' +
      '_master/public/11761093050398/C-0372-Paris-Macaron-2000x2000.png?impolicy=product&imwidth=65',
    name: 'Variations Paris Macaron', description: 'Almond flavoured', price: 1}
];

@Component({
  selector: 'app-coffee-information',
  templateUrl: './coffee-information.component.html',
  styleUrls: ['./coffee-information.component.scss']
})
export class CoffeeInformationComponent implements OnInit {
  displayedColumns: string[] = ['id', 'thumbnail', 'name', 'description', 'price'];
  dataSource = ELEMENT_DATA;

  selectedRowIndex = -1;
  coffeeInProcess = false;
  // jasonFile: String = 'C:\Users\const\Documents\hackathon\arduinoCom';

  constructor(private httpService: HttpService, private dialog: MatDialog,
              private closeDialogService: CloseDialogService, private chipScannedService:
              ChipScannedService, private changePopupTextService: ChangePopupTextService) { }

  ngOnInit () {
  }

  highlight(row) {
    this.selectedRowIndex = row.id;

    setTimeout(() => {
        this.resetRow();
        this.coffeeInProcess = false;
      },
      10000);
  }

  resetRow() {
    this.selectedRowIndex = -1;
    this.coffeeInProcess = false;
  }

 async openDialog() {
    if (this.coffeeInProcess === true) {
      const dialogConfig = new MatDialogConfig();

      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.hasBackdrop = true;

      this.httpService.sendData(this.selectedRowIndex);
      this.dialog.open(DialogComponent, dialogConfig);
      this.sendMessage();
      while (this.chipScannedService.scanned === false) {
          await this.delay(500);
          this.chipScannedService.getData();
          console.log(this.chipScannedService.scanned);
      }

      if (this.chipScannedService.scanned === true) {
        this.dialog.open(DialogComponent, dialogConfig);
        this.sendMessage2();
      }
      this.chipScannedService.scanned = false;

      this.resetRow();
    } else {
      this.coffeeInProcess = false;
    }
  }

  sendMessage2(): void {
    this.changePopupTextService.sendMessage('Change Pop up text!');
  }

  sendMessage(): void {
    this.closeDialogService.sendMessage('Message from Coffee information component to dialog component!');
  }

  async loading() {
    if (this.selectedRowIndex === -1) {
      window.alert('No coffee selected!');
    } else {
      this.coffeeInProcess = true;
      console.log('Going to while');
      const wait = '0';
      while (wait === '0') {
        // this.httpService.sendData(this.trigger).subscribe(res => {
        // console.log(res);
        // this.wait = res;
        // });
        await this.delay(3000);
    }
    this.coffeeInProcess = false;
    window.alert('Kaffee wird zubereitet...\n\nNutzer: -1,0\nHändler: +0,7\nPlantage: +0,3');
    }
  }

  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
