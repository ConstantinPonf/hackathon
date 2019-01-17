import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';
import { CloseDialogService } from '../shared/closeDialog-service';
import { ChipScannedService } from '../shared/chipScanned-service';
import { ChangePopupTextService } from '../shared/changePopupText-service';
import { BrewedCoffeeService } from '../shared/brewedCoffee-service';
import { ClosePopupService } from '../shared/closePopup-service';

export interface CoffeeSorts {
  id: number;
  thumbnail: string;
  name: string;
  description: string;
  price: number;
}

const ELEMENT_DATA: CoffeeSorts[] = [
  {
    id: 1,
    thumbnail: 'assets/EspressoCosi.jp2',
    name: 'Espresso Cosi', description: 'Fruity', price: 1
  },
  {
    id: 2,
    thumbnail: 'assets/Ristretto.jp2',
    name: 'Ristretto', description: 'Powerful and Contrasting', price: 1
  },
  {
    id: 3,
    thumbnail: 'assets/MasterOriginIndia.jp2',
    name: 'Master Origin India', description: 'Intense and Spicy', price: 1
  },
  {
    id: 4,
    thumbnail: 'assets/MasterOriginIndonesia.jp2',
    name: 'Master Origin Indonesia', description: 'Rich, with woody notes', price: 1
  },
  {
    id: 5,
    thumbnail: 'assets/VariationsParisMacaron.png',
    name: 'Variations Paris Macaron', description: 'Almond flavoured', price: 1
  }
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

  constructor(private httpService: HttpService,
    private dialog: MatDialog,
    private chipScannedService: ChipScannedService,
    private brewedCoffeeService: BrewedCoffeeService,
    private closePopupService: ClosePopupService) { }

  ngOnInit() {
  }

  highlight(row) {
    this.selectedRowIndex = row.id;
  }

  resetRow() {
    this.selectedRowIndex = -1;
    this.coffeeInProcess = false;
  }

  async openDialog() {
    if (this.selectedRowIndex === -1) {
      return;
    }
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.hasBackdrop = true;

    this.httpService.sendData(this.selectedRowIndex);
    this.dialog.open(DialogComponent, dialogConfig);

    let counter = 0;
    while (this.chipScannedService.scanned === false) {
      await this.delay(500);
      this.chipScannedService.getData();
      console.log(this.chipScannedService.scanned);

      // ONLY FOR TESTING
      if (counter === 5) {
        this.chipScannedService.scanned = true;
      }
      // ONLY FOR TESTING END
      if (counter === 9) {
        this.resetRow();
        this.brewedCoffeeService.coffeeBrewed();
        this.sendMessage('close');
        this.sendMessage('');
        return;
      }
      counter++;
    }

    this.sendMessage('prepare');
    await this.delay(2500);

    this.chipScannedService.scanned = false;
    this.resetRow();
    this.brewedCoffeeService.coffeeBrewed();
    this.sendMessage('close');
    this.sendMessage('');

  }

  sendMessage(msg: string): void {
    this.closePopupService.sendMessage(msg);
    this.closePopupService.sendMessage(msg);
  }

  loading() {
    if (this.selectedRowIndex === -1) {
      window.alert('No coffee selected!');
    }
  }

  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
