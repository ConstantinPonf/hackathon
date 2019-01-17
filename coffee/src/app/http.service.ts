import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
      'Content-Type': 'text/html',
      // 'Access-Control-Allow-Origin' : 'http://localhost:8080/RobotinoApp/Servlet',
  })
}

@Injectable()
export class HttpService {
  url = 'http://localhost:8080/coffee';
  id = 1;
  constructor(private http: HttpClient) { }
  sendData(data: any) {
    return this.http.post('http://localhost:8080/coffee/' + this.id, {
      responseType: 'text'
     });
   /*.pipe(
     catchError(val => of('I caught:'+val));
   )*/
 }
}
