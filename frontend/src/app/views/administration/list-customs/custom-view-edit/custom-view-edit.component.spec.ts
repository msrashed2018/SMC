import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomViewEditComponent } from './custom-view-edit.component';

describe('CustomViewEditComponent', () => {
  let component: CustomViewEditComponent;
  let fixture: ComponentFixture<CustomViewEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomViewEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomViewEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
