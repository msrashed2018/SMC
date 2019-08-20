import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestStatusDataComponent } from './request-status-data.component';

describe('RequestStatusDataComponent', () => {
  let component: RequestStatusDataComponent;
  let fixture: ComponentFixture<RequestStatusDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestStatusDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestStatusDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
