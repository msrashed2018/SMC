import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisabilityViewEditComponent } from './disability-view-edit.component';

describe('DisabilityViewEditComponent', () => {
  let component: DisabilityViewEditComponent;
  let fixture: ComponentFixture<DisabilityViewEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisabilityViewEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisabilityViewEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
