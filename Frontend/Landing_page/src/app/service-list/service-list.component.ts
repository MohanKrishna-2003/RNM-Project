// service-list.component.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FeedbackComponent } from '../feedback/feedback.component';
declare var $: any;

@Component({
  selector: 'app-service-list',
  standalone:true,
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.css'],
  imports: [CommonModule]
})
export class ServiceListComponent {
  services = [
    {
      title: 'Schedule a Test Drive',
      description:
        'Easily schedule a test drive at your preferred time and location. We offer flexible booking options to fit your schedule.',
      image: 'testdrive.jpg',
      reverseOrder: false, // image on left
    },
    {
      title: '24 x 7 Assistance',
      description:
        'We have tied up with RNM Auto Assist (India) Limited to ensure that you get immediate and hassle-free service in the event of any car breakdown. Our network for roadside assistance covers cities, highways, and hilly terrains across India.',
      image: 'assistance.jpg',
      reverseOrder: true, // image on right
    },
    {
      title: 'Value Care (AMC)',
      description:
        'Value Care (AMC) is a maintenance plan that guarantees protection against unexpected repairs & provides substantial savings through protection against inflation and price volatility of consumables. It covers all services and repairs including labor, parts & consumables.',
      image: 'value.jpg',
      reverseOrder: false, // image on left
    },
  ];


  testimonials = [
    { name: 'John Doe', brand: 'Renault', description: 'I absolutely love my Renault! It\'s comfortable, fuel-efficient, and perfect for city driving.' },
    { name: 'Jane Smith', brand: 'Nissan', description: 'The Nissan car I purchased has amazing features, and I feel safe and confident every time I drive it.' },
    { name: 'Bob Johnson', brand: 'Mitsubishi', description: 'Mitsubishi never disappoints. It\'s powerful and reliable, and I love the off-road capabilities of my vehicle.' },
    { name: 'Alice Brown', brand: 'Renault', description: 'I am so impressed with the smooth driving experience of my Renault. The tech features make driving a joy.' },
    { name: 'Charlie White', brand: 'Nissan', description: 'Nissan cars are known for their reliability, and my experience has been no different. Would recommend to anyone!' },
    { name: 'Diana Green', brand: 'Mitsubishi', description: 'My Mitsubishi SUV is perfect for all my family trips. Great performance and plenty of space.' },
  ];
ngAfterViewInit() {
  $('#customer-carousel').owlCarousel({
    loop: true,
    margin: 10,
    nav: true,
    dots: false,
    autoplay: true,
    autoplayTimeout: 3000,
    items: 3,  // Show 3 items per slide
    responsive: {
      0: {
        items: 1  // 1 item on small screens
      },
      600: {
        items: 2  // 2 items on medium screens
      },
      1000: {
        items: 3  // 3 items on larger screens
      }
    }
  });
}
}