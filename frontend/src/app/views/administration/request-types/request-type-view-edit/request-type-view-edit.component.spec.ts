import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestTypeViewEditComponent } from './request-type-view-edit.component';

describe('RequestTypeViewEditComponent', () => {
  let component: RequestTypeViewEditComponent;
  let fixture: ComponentFixture<RequestTypeViewEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestTypeViewEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestTypeViewEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
