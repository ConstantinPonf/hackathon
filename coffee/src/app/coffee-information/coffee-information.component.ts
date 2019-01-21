import { Component, OnInit } from '@angular/core';
import { HttpService } from '../shared/http.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';
import { ClosePopupService } from '../shared/closePopup-service';
import { Web3 } from 'web3';

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
    thumbnail: 'assets/EspressoCosi.png',
    name: 'Espresso Cosi', description: 'Fruity', price: 1
  },
  {
    id: 2,
    thumbnail: 'assets/Ristretto.png',
    name: 'Ristretto', description: 'Powerful and Contrasting', price: 1
  },
  {
    id: 3,
    thumbnail: 'assets/MasterOriginIndia.png',
    name: 'Master Origin India', description: 'Intense and Spicy', price: 1
  },
  {
    id: 4,
    thumbnail: 'assets/MasterOriginIndonesia.png',
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

  constructor(private httpService: HttpService, private dialog: MatDialog,
              private closePopupService: ClosePopupService) { }

  ngOnInit() {
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
    while (this.httpService.scanned === false) {
      await this.delay(500);
      this.httpService.getData();
      console.log(this.httpService.scanned);

      // ONLY FOR TESTING
      if (counter === 5) {
        this.httpService.scanned = true;
      }
      // ONLY FOR TESTING END
      if (counter === 9) {
        this.resetRow();
        this.httpService.coffeeBrewed();
        this.sendMessage('close');
        this.sendMessage('');
        return;
      }
      counter++;
    }

    this.sendMessage('prepare');
    await this.delay(2500);

    this.httpService.scanned = false;
    this.resetRow();
    this.httpService.coffeeBrewed();
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

  purchase() {
    const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
    web3.eth.defaultAccount = web3.eth.accounts[0];
    const coffeeExchange = web3.eth.contract([
      {
        "constant": false,
        "inputs": [
          {
            "name": "_user",
            "type": "address"
          }
        ],
        "name": "refill",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [],
        "name": "transfer",
        "outputs": [],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "_buyer",
            "type": "address"
          },
          {
            "name": "_producer",
            "type": "address"
          },
          {
            "name": "_farmer",
            "type": "address"
          },
          {
            "name": "value",
            "type": "uint256"
          },
          {
            "name": "donation",
            "type": "uint256"
          }
        ],
        "name": "multiTransfer",
        "outputs": [
          {
            "name": "success",
            "type": "bool"
          }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
      }
    ]).at(0x8aD64AFa1A3007345F75Ca85311d254243E593D5);
    coffeeExchange.multiTransfer(web3.eth.accounts[0], web3.eth.accounts[1], web3.eth.accounts[2], 100, 20).call();
  }
}
