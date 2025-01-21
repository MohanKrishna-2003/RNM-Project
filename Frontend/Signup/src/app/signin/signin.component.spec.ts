import { ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<<<< Temporary merge branch 1
<<<<<<<< HEAD:Frontend/Signup/src/app/signin/signin.component.spec.ts
=========
>>>>>>>>> Temporary merge branch 2
import { SigninComponent } from './signin.component';

describe('SigninComponent', () => {
  let component: SigninComponent;
  let fixture: ComponentFixture<SigninComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SigninComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SigninComponent);
<<<<<<<<< Temporary merge branch 1
========
import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
>>>>>>>> f2ac65f4b7d918fb402144fb2282bfa5130c9e32:Frontend/home/src/app/footer/footer.component.spec.ts
=========
>>>>>>>>> Temporary merge branch 2
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
