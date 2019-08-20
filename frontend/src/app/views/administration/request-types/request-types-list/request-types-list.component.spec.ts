import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestTypesListComponent } from './request-types-list.component';

describe('RequestTypesListComponent', () => {
  let component: RequestTypesListComponent;
  let fixture: ComponentFixture<RequestTypesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestTypesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestTypesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
