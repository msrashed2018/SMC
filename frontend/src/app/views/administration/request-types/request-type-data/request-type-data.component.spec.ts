import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestTypeDataComponent } from './request-type-data.component';

describe('RequestTypeDataComponent', () => {
  let component: RequestTypeDataComponent;
  let fixture: ComponentFixture<RequestTypeDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestTypeDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestTypeDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
