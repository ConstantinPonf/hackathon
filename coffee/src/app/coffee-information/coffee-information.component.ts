import { Component, OnInit, NgModule } from '@angular/core';
import { Coffee } from '../coffee'

export interface CoffeeSorts {
  id: number;
  thumbnail: string,
  name: string,
  description: string,
  price: number
}

const ELEMENT_DATA: CoffeeSorts[] = [
  {id: 1, thumbnail: "https://www.nespresso.com/ecom/medias/sys_master/public/10386856312862/C-0004-2000x2000.png?impolicy=product&imwidth=65", name: 'Espresso Cosi', description: 'Fruity', price: 1},
  {id: 2, thumbnail: "https://www.nespresso.com/ecom/medias/sys_master/public/10386857492510/C-0023-2000x2000.png?impolicy=product&imwidth=65", name: 'Ristretto', description: 'Powerful and Contrasting', price: 1},
  {id: 3, thumbnail: "https://www.nespresso.com/ecom/medias/sys_master/public/10840367792158/C-0359-India-2000x2000.png?impolicy=product&imwidth=65", name: 'Master Origin India', description: 'Intense and Spicy', price: 1},
  {id: 4, thumbnail: "https://www.nespresso.com/ecom/medias/sys_master/public/10820727865374/C-0360-Indonesia-2000x2000.png?impolicy=product&imwidth=65", name: 'Master Origin Indonesia', description: 'Rich, with woody notes', price: 1},
  {id: 5, thumbnail: "https://www.nespresso.com/ecom/medias/sys_master/public/11761093050398/C-0372-Paris-Macaron-2000x2000.png?impolicy=product&imwidth=65", name: 'Variations Paris Macaron', description: 'Almond flavoured', price: 1}
];

@Component({
  selector: 'app-coffee-information',
  templateUrl: './coffee-information.component.html',
  styleUrls: ['./coffee-information.component.scss']
})
export class CoffeeInformationComponent implements OnInit {
  displayedColumns: string[] = ['id', 'thumbnail', 'name', 'description', 'price'];
  dataSource = ELEMENT_DATA;

  selectedRowIndex: number = -1;
  coffeeInProcess: boolean = false;
  jasonFile: String = "C:\Users\const\Documents\hackathon\arduinoCom"


  highlight(row){
    this.selectedRowIndex = row.id;
  }

  loading() {
    if(this.selectedRowIndex === -1) {
      window.alert("Es ist kein Kaffee ausgewählt!");
    }
    else {
      this.coffeeInProcess = true;
    }
  }

  ngOnInit () {}
}
