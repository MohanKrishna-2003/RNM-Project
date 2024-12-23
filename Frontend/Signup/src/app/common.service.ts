import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http:HttpClient) { }
  printMsg(){
    console.log("from service");
  }
  addition(a:number , b:number):number{
    return a+b;
  }

  loginDetails(data:any) {
    return this.http.post("http://localhost:8080/loginByPost", data);
  }
}
