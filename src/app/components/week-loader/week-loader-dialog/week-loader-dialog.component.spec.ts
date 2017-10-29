import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekLoaderDialogComponent } from './week-loader-dialog.component';

describe('WeekLoaderDialogComponent', () => {
  let component: WeekLoaderDialogComponent;
  let fixture: ComponentFixture<WeekLoaderDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeekLoaderDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeekLoaderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
