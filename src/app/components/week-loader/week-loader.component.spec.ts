import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekLoaderComponent } from './week-loader.component';

describe('WeekLoaderComponent', () => {
  let component: WeekLoaderComponent;
  let fixture: ComponentFixture<WeekLoaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeekLoaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeekLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
