
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule for *ngIf and other common directives
import { Router, RouterModule } from '@angular/router';
import { HomeComponent } from "../home/home.component";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { error } from 'jquery';

@Component({
  selector: 'app-header',
  standalone: true, // Make it standalone
  imports: [CommonModule, RouterModule,ReactiveFormsModule,FormsModule], // Include CommonModule to use *ngIf and other directives
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  name: String='';
    errorMsg="";
   adminName:String='';
  edit:FormGroup;
  constructor(private router: Router , private http:HttpClient,private fb:FormBuilder) {}
  // ngOnInit(): void {
  //   this.name = localStorage.getItem("useremail") || "";
  //   const name = localStorage.getItem("username");
  //   const email = localStorage.getItem("useremail");
  //   if (name) {
  //     this.edit.patchValue({
  //       user_name: name
  //     });
  //   }
  //   if (email) {
  //     this.edit.patchValue({
  //       user_email: email
  //     });
  //   }
  // }
  ngOnInit(): void {
    // Initialize the form group
    this.edit = this.fb.group({
      name: [''],
      email: [''],
      mobile: [''],
      address: [''],
    });

    // Get values from localStorage and patch the form values
    const name = localStorage.getItem("username");
    const email = localStorage.getItem("useremail");
    const mobile = localStorage.getItem("phone");
    const address = localStorage.getItem("address");
    // Check if name and email exist in localStorage
    if (name) {
      this.edit.patchValue({
        name: name,
      });
    }

    if (email) {
      this.edit.patchValue({
        email: email,
      });
    }
    if(mobile){
      this.edit.patchValue({
        mobile:mobile,
      });
    }
    if(address){
      this.edit.patchValue({
        address:address,
      });
    }


    // Optionally, update the name value in the header
    this.name = localStorage.getItem("username") || "";
    this.adminName=localStorage.getItem("adminName");
    console.log(this.adminName);
    
  }
  // Variable to toggle the visibility of the profile box
  isProfileBoxVisible = false;

  // Variable to simulate whether the user is logged in (this can be controlled based on your authentication logic)
  isLoggedIn = false;

  // Function to toggle the visibility of the profile box
  toggleProfileBox() {
    this.isProfileBoxVisible = !this.isProfileBoxVisible;
  }

  // Function to handle Login
  onLogin() {
    this.router.navigateByUrl('/login');
    console.log('Redirect to Login page');
  }
// Function to handle Sign Up
  onSignup() {
    this.router.navigateByUrl('/signup');
    console.log('Redirect to Signup page');
  }
  Onlogout(){
    // localStorage.removeItem("useremail");  
localStorage.clear();
this.name="";
window.location.reload();
  
}
isOpen=false;
openPop(){
    this.isOpen=true;
    document.body.style.overflow="hidden";
   }
  closePop(){
    this.isOpen=false;
    document.body.style.overflow="auto";
  }
submit() {
    const id = localStorage.getItem('id');

  const updateUser = this.edit.value;
    console.log(updateUser);
    
    if (id) {
     this.http.put(`http://localhost:8080/user/updateProfile/${id}`, updateUser)
            .subscribe((res) => {
                    console.log("Updated");
                    localStorage.setItem("phone",updateUser.mobile);
                    localStorage.setItem("address",updateUser.address);
                    alert("Successfully updated")
                    this.closePop();
                },(err) => {
                    this.errorMsg = err.error['message'];
                });
    } else {
        console.error('User ID is missing');
    }
}


}
