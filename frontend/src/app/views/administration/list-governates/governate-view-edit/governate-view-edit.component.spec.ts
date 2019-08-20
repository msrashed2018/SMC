import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GovernateViewEditComponent } from './governate-view-edit.component';

describe('GovernateViewEditComponent', () => {
  let component: GovernateViewEditComponent;
  let fixture: ComponentFixture<GovernateViewEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GovernateViewEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GovernateViewEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
