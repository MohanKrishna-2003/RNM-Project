import { Component } from '@angular/core';
import { AdminHeaderComponent } from '../admin-header/admin-header.component';

@Component({
  selector: 'app-admin-settings',
  standalone: true,
  imports: [AdminHeaderComponent],
  templateUrl: './admin-settings.component.html',
  styleUrl: './admin-settings.component.css'
})
export class AdminSettingsComponent {

  formshow= false;
showform(){
  this.formshow= !this.formshow;
}
}
