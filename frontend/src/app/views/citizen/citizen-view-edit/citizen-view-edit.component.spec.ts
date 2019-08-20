import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CitizenViewEditComponent } from './citizen-view-edit.component';

describe('CitizenViewEditComponent', () => {
  let component: CitizenViewEditComponent;
  let fixture: ComponentFixture<CitizenViewEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CitizenViewEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CitizenViewEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
