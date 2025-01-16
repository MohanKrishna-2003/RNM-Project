import { ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<<< HEAD:Frontend/home/src/app/h1/h1.component.spec.ts
import { H1Component } from './h1.component';

describe('H1Component', () => {
  let component: H1Component;
  let fixture: ComponentFixture<H1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [H1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(H1Component);
========
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
>>>>>>>> f2ac65f4b7d918fb402144fb2282bfa5130c9e32:Frontend/home/src/app/header/header.component.spec.ts
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
