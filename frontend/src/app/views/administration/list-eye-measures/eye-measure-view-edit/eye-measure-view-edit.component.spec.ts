import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EyeMeasureViewEditComponent } from './eye-measure-view-edit.component';

describe('EyeMeasureViewEditComponent', () => {
  let component: EyeMeasureViewEditComponent;
  let fixture: ComponentFixture<EyeMeasureViewEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EyeMeasureViewEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EyeMeasureViewEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
