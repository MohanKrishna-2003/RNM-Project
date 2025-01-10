import { Component, OnInit } from '@angular/core';
import { AdminHeaderComponent } from '../admin-header/admin-header.component';
import { HttpClient } from '@angular/common/http';

// interface Admin{
//   name: String;
//   mail:String;
//   company:String;
//   address:String;
//   bio:String;
// }
@Component({
  selector: 'app-admin-settings',
  standalone: true,
  imports: [AdminHeaderComponent],
  templateUrl: './admin-settings.component.html',
  styleUrl: './admin-settings.component.css'
})
export class AdminSettingsComponent implements OnInit{

  admin : any;
  constructor(private http:HttpClient){}
  ngOnInit(): void {
    this.http.get("http://localhost:8085/admin/details").subscribe((res)=>{
      console.log(res);
      this.admin = res
    })
  }

  formshow= false;
showform(){
  this.formshow= !this.formshow;
}
}
