import { Component, OnInit } from '@angular/core';
import { RequestService } from '../shared/request-service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';
import { ClosePopupService } from '../shared/closePopup-service';

const Web3 = require('web3');


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

  contractCoffeeExchangeABI = [
    {
      "constant": true,
      "inputs": [],
      "name": "counter",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "getCounter",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "increment",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];
  web3: any;
  accs: any;
  coffeeExchange: any;
  contractCoffeeExchangeAddress: 0xd8114d3f4cBcd8cE428ef23EC97328D716A2144C;

  constructor(private httpService: RequestService, private dialog: MatDialog,
              private closePopupService: ClosePopupService) { }

  ngOnInit() {
    this.web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:7545'));
    this.web3.eth.getAccounts((err, accs) => {
      if (err != null) {
        Error('There was an error fetching the ether accounts.');
      }
      if (accs.length === 0) {
        Error('Couldn\'t get any accounts! Make sure Ethereum client is configured correctly.');
      }
      this.accs = accs;
    });
    this.coffeeExchange = this.web3.eth.contract(this.contractCoffeeExchangeABI).at(this.contractCoffeeExchangeAddress);
    console.log(this.coffeeExchange);
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
    this.purchase();
    console.log('purchase wurde in der aufgerufen.');
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
    console.log(this.accs[0]);
    console.log(this.accs[1]);
    console.log(this.accs[2]);
    this.coffeeExchange.getCounter({from: this.accs[0], gas: 20000000000 }, (err, res) => {
      if (err !== undefined) {
        console.log('Transaction 1 failed.');
        console.log(err);
      } else {
        console.log('Transaction 1 successful.');
        console.log(res);
      }
    });
    this.coffeeExchange.increment({from: this.accs[0], gas: 20000000000}, (err, res) => {
      if (err !== undefined) {
        console.log('Transaction 2 failed.');
        console.log(err);
      } else {
        console.log('Transaction 2 successful.');
      }
    });
    this.coffeeExchange.getCounter({from: this.accs[0], gas: 20000000000 }, (err, res) => {
      if (err !== undefined) {
        console.log('Transaction 3 failed.');
        console.log(err);
      } else {
        console.log('Transaction 3 successful');
        console.log(res);
      }
    });
    /*this.coffeeExchange.buy.call(
      {from: this.accs[0], gas: 1000000, value: 2000000000000000000}, (err, res) => {
        if (err !== undefined) {
          console.log('Transaktion1 fehlgeschlagen.');
          console.log(err);
        } else {
          console.log('Transaktion1 erfolgreich.');
          console.log(res);
        }
      });
    this.coffeeExchange.purchase.call(
      this.accs[1], this.accs[2], { from: this.accs[0], gas: 1000000 }, (err, res) => {
        if (err !== undefined) {
          console.log('Transaktion2 fehlgeschlagen.');
          console.log(err);
        } else {
          console.log('Transaktion2 erfolgreich.');
          console.log(res);
        }
      });
    this.coffeeExchange.pay.call(
      this.accs[1], this.accs[2], { from: this.accs[0], gas: 1000000000, value: 2000000000000000000 }, (err, res) => {
        if (err !== undefined) {
          console.log('Transaktion3 fehlgeschlagen.');
          console.log(err);
        } else {
          console.log('Transaktion3 erfolgreich.');
          console.log(res);
        }
      });*/
  }
}
