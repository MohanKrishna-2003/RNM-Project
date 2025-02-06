import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthorisationServiceService implements CanActivate {

  constructor(private router: Router) { }

  canActivate() : boolean{
    // return true;
    let val = localStorage.getItem("admin");
    let val1 = localStorage.getItem("id");    
    if(val =='' || val== undefined){
      alert("Please login with your admin credentials to continue !")
      this.router.navigateByUrl('/login');
return false;    }
// if(val1 == "1" || val1== undefined){
//   alert("Please login or register to continue !")
//   this.router.navigateByUrl('/login');
//   return false; 
// }
else{

  return true;
}
}

}