import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CitizenRequestsComponent } from './citizen-requests.component';

describe('CitizenRequestsComponent', () => {
  let component: CitizenRequestsComponent;
  let fixture: ComponentFixture<CitizenRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CitizenRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CitizenRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
