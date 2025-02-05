import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  constructor(private router:Router){}
  adminname:String="";
  ngOnInit(): void {
this.adminname=localStorage.getItem("adminName") ?? "John Charlie";  }
logout(){
  this.router.navigateByUrl("home");
  localStorage.clear();
}

}
