import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OccupationViewEditComponent } from './occupation-view-edit.component';

describe('OccupationViewEditComponent', () => {
  let component: OccupationViewEditComponent;
  let fixture: ComponentFixture<OccupationViewEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OccupationViewEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OccupationViewEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
