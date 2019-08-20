import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommitteeMemberDataComponent } from './committee-member-data.component';

describe('CommitteeMemberDataComponent', () => {
  let component: CommitteeMemberDataComponent;
  let fixture: ComponentFixture<CommitteeMemberDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommitteeMemberDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommitteeMemberDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
