import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
      'Content-Type': 'text/html',
  })
};

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  url = 'http://localhost:8080/coffee/';
  scanned = false;

  constructor(private http: HttpClient) { }

  sendData(id: number) {
    return this.http.post<boolean>(this.url + 'order', id).subscribe(po => {
    },
      error => {
      console.log(error);
      });
 }

  coffeeBrewed() {
    return this.http.get<boolean>(this.url + 'brewed').subscribe(po => {
      },
      error => {
        console.log(error);
      });
  }

  getData() {
    return this.http.get<boolean>(this.url + 'scanned').subscribe(data => {
        this.scanned = data;
      },
      error => {

        console.log(error);
      }
    );
  }
}
