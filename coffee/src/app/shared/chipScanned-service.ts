import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'text/html',
  })
}

@Injectable({
  providedIn: 'root'
})
export class ChipScannedService {
  url = 'http://localhost:8080/coffee/';
  scanned = false;

  constructor(private http: HttpClient) { }

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
