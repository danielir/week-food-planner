import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekStoreComponent } from './week-store.component';

describe('WeekStoreComponent', () => {
  let component: WeekStoreComponent;
  let fixture: ComponentFixture<WeekStoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeekStoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeekStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
