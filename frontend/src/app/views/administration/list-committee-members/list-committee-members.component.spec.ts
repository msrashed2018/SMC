import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCommitteeMembersComponent } from './list-committee-members.component';

describe('ListCommitteeMembersComponent', () => {
  let component: ListCommitteeMembersComponent;
  let fixture: ComponentFixture<ListCommitteeMembersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCommitteeMembersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCommitteeMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
