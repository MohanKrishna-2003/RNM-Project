import { Component, OnInit } from '@angular/core';
import { AdminHeaderComponent } from '../admin-header/admin-header.component';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import swal from 'sweetalert';


@Component({
  selector: 'app-admin-settings',
  standalone: true,
  imports: [AdminHeaderComponent, CommonModule, FormsModule, ReactiveFormsModule ],
  templateUrl: './admin-settings.component.html',
  styleUrl: './admin-settings.component.css'
})
export class AdminSettingsComponent implements OnInit{
  profileForm!: FormGroup;
  passwordVisible: boolean = false;

  admin : any;
  constructor(private fb: FormBuilder, private http:HttpClient){}

ngOnInit(): void {
  this.http.get("http://localhost:8080/admin/details").subscribe(
    (res: any) => {
      console.log(res);
      this.admin = res;
      
      this.profileForm = this.fb.group({
        name: [this.admin[0]?.name || '', [Validators.required, Validators.minLength(3)]],
        email: [this.admin[0]?.mail || '', [Validators.required, Validators.email]],
        company: [this.admin[0]?.company || '', [Validators.required]],
        address: [this.admin[0]?.address || '', [Validators.required]],
        bio: [this.admin[0]?.bio || '', [Validators.required, Validators.minLength(10)]],
        password:[this.admin[0]?.password || '', [Validators.required]] 
      });
    },
    (error) => {
      console.error('Error fetching admin details:', error);
    }
  );
  localStorage.setItem("adminName",this.admin[0].name);
}

formshow = false;
close= false;

showform() {
  this.formshow = !this.formshow;
}

onSubmit() {
  if (this.profileForm.invalid) {
    return;
  }

  const profileData = this.profileForm.value;

  this.updateProfile(profileData).subscribe(
    (response) => {
      console.log('Profile updated successfully', response);
      // SweetAlert1 Success
      swal({
        title: "Success!",
        text: "Admin details have been successfully updated.",
        icon: "success",
      }).then(() => {
        window.location.reload();
      });
    },
    (error) => {
      console.error('There was an error updating the profile', error);
      swal({
        title: "Error!",
        text: "There was an error updating the profile.",
        icon: "error",
      });
    }
  );
  
}

reloadPage(): void {
  window.location.reload();  
}

updateProfile(profileData: any): Observable<any> {
  const apiUrl = 'http://localhost:8080/admin/update'; // Replace with your API URL
  // console.log(profileData);
  
  return this.http.post(apiUrl, profileData);
}

get f() {
  return this.profileForm.controls;
}

}
