import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RxjsExampleService {

  constructor() { }
  msg=new BehaviorSubject<String>("");
  sendMessage(msg:String){
    //publish the message to all the available subscribers
    this.msg.next(msg);
  }
}
