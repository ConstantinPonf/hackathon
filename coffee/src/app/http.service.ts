import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
//import { of } from 'rxjs/observable/of';

const httpOptions= {
  headers: new HttpHeaders({
      'Content-Type': 'text/html',
      //'Access-Control-Allow-Origin' : 'http://localhost:8080/RobotinoApp/Servlet',
  })
}

@Injectable()
export class HttpService {
    //url: string = 'http://192.168.0.100:8080/RobotinoApp/Servlet';
 url: string ="http://127.0.0.1:8081/test";
 constructor(private http: HttpClient) { } 
sendData(data: any){
     return this.http.get(this.url+'?triggered='+data, {
       responseType: 'text'
     });
   /*.pipe(
     catchError(val => of('I caught:'+val));
   )*/;
 }}
