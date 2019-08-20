import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OccupationDataComponent } from './occupation-data.component';

describe('OccupationDataComponent', () => {
  let component: OccupationDataComponent;
  let fixture: ComponentFixture<OccupationDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OccupationDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OccupationDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
