import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestStatusViewEditComponent } from './request-status-view-edit.component';

describe('RequestStatusViewEditComponent', () => {
  let component: RequestStatusViewEditComponent;
  let fixture: ComponentFixture<RequestStatusViewEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestStatusViewEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestStatusViewEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
