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
export class ChipScannedService {
  url = 'http://localhost:8080/coffee/';
  scanned: boolean;

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
