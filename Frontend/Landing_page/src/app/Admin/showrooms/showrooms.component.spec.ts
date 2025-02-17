import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowroomsComponent } from './showrooms.component';

describe('ShowroomsComponent', () => {
  let component: ShowroomsComponent;
  let fixture: ComponentFixture<ShowroomsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowroomsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowroomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
