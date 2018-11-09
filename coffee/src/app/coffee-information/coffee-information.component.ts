import { Component, OnInit } from '@angular/core';
import { Coffee } from '../coffee'

export interface CoffeeSorts {
  id: number;
  thumbnail: string,
  name: string,
  description: string,
  price: number
}

const ELEMENT_DATA: CoffeeSorts[] = [
  {id: 1, thumbnail: '../../../resources/C-0004-2000x2000.png', name: 'Espresso Cosi', description: 'Fruity', price: 1},
  {id: 2, thumbnail: '/home/user/Desktop/ERC20DApp/coffee/resources/C-0023-2000x2000.png', name: 'Ristretto', description: 'Powerful and Contrasting', price: 1},
  {id: 3, thumbnail: '/home/user/Desktop/ERC20DApp/coffee/resources/C-0359-India-2000x2000.png', name: 'Master Origin India', description: 'Intense and Spicy', price: 1},
  {id: 4, thumbnail: '/home/user/Desktop/ERC20DApp/coffee/resources/C-0360-Indonesia-2000x2000.png', name: 'Master Origin Indonesia', description: 'Rich, with woody notes', price: 1},
  {id: 5, thumbnail: '/home/user/Desktop/ERC20DApp/coffee/resources/C-0372-Paris-Macaron-2000x2000.png', name: 'Variations Paris Macaron', description: 'Almond flavoured', price: 1}
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

highlight(row){
    this.selectedRowIndex = row.id;
}

loadingScreen() {
  window.alert("Hallo");
}

  ngOnInit () {}
}
