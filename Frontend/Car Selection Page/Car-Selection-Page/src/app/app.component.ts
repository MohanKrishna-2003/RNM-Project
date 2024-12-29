import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CarSelectionComponent } from './car-selection/car-selection.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CarSelectionComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Car-Selection-Page';
}
