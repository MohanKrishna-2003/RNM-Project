import { ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<<< HEAD:Frontend/Landing_page/src/app/logo/logo.component.spec.ts
import { LogoComponent } from './logo.component';

describe('LogoComponent', () => {
  let component: LogoComponent;
  let fixture: ComponentFixture<LogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogoComponent);
========
import { TestimonialComponent } from './testimonial.component';

describe('TestimonialComponent', () => {
  let component: TestimonialComponent;
  let fixture: ComponentFixture<TestimonialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestimonialComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestimonialComponent);
>>>>>>>> 535c90de0291ddf6adba12413b7ba10c27c204e1:Frontend/Landing_page/src/app/testimonial/testimonial.component.spec.ts
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
