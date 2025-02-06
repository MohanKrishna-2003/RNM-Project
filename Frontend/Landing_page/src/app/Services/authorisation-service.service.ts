import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthorisationServiceService implements CanActivate {

  constructor() { }
  canActivate() : boolean{
    // return true;
    let val = localStorage.getItem("admin");
    if(val =='' || val== undefined){
return false;    }
else{

  return true;
}
}
}