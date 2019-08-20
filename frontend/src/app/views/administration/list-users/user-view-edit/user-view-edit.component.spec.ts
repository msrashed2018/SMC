import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserViewEditComponent } from './user-view-edit.component';

describe('UserViewEditComponent', () => {
  let component: UserViewEditComponent;
  let fixture: ComponentFixture<UserViewEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserViewEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserViewEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
