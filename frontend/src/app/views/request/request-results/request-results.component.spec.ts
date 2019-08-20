import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestResultsComponent } from './request-results.component';

describe('RequestResultsComponent', () => {
  let component: RequestResultsComponent;
  let fixture: ComponentFixture<RequestResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
