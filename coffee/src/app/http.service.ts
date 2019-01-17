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
export class HttpService {
  url = 'http://localhost:8080/coffee';
  id = 1;
  constructor(private http: HttpClient) { }

  sendData(id: number) {
    return this.http.post<>(this.url + id, id).subscribe(number => {
       console.log(number);
    },
      error => {
      console.log(error);
      });
 }
}
