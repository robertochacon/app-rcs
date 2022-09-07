import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultingOutComponent } from './consulting-out.component';

describe('ConsultingOutComponent', () => {
  let component: ConsultingOutComponent;
  let fixture: ComponentFixture<ConsultingOutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultingOutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultingOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
