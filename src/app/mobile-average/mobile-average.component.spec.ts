import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileAverageComponent } from './mobile-average.component';

describe('MobileAverageComponent', () => {
  let component: MobileAverageComponent;
  let fixture: ComponentFixture<MobileAverageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobileAverageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileAverageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
