import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommitteeMemberViewEditComponent } from './committee-member-view-edit.component';

describe('CommitteeMemberViewEditComponent', () => {
  let component: CommitteeMemberViewEditComponent;
  let fixture: ComponentFixture<CommitteeMemberViewEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommitteeMemberViewEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommitteeMemberViewEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
