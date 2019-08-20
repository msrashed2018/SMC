import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EyeMeasureDataComponent } from './eye-measure-data.component';

describe('EyeMeasureDataComponent', () => {
  let component: EyeMeasureDataComponent;
  let fixture: ComponentFixture<EyeMeasureDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EyeMeasureDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EyeMeasureDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
