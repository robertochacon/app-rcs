import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessengersShipmentsComponent } from './messengers-shipments.component';

describe('MessengersShipmentsComponent', () => {
  let component: MessengersShipmentsComponent;
  let fixture: ComponentFixture<MessengersShipmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessengersShipmentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessengersShipmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
