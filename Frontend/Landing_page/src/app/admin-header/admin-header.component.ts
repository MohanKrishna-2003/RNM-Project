import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.css',
})
export class AdminHeaderComponent {

  constructor(private router:Router){} 
   adminname:String="";
  linkopen:boolean=false;
  ngOnInit(): void {
this.adminname=localStorage.getItem("admin") ?? " ";  
  }

  onLinkClick(){
this.linkopen=!this.linkopen;
  }
  logout(){
    this.router.navigateByUrl("home");
    localStorage.clear();
  }
}
