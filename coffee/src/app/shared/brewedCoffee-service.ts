import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'text/html',
    // 'Access-Control-Allow-Origin' : 'http://localhost:8080/RobotinoApp/Servlet',
  })
}

@Injectable({
  providedIn: 'root'
})
export class BrewedCoffeeService {
  url = 'http://localhost:8080/coffee/';

  constructor(private http: HttpClient) { }

  coffeeBrewed() {
    return this.http.get<boolean>(this.url + 'brewed').subscribe(po => {
      },
      error => {
        console.log(error);
      });
  }
}
