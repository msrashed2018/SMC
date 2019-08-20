import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommitteeViewEditComponent } from './committee-view-edit.component';

describe('CommitteeViewEditComponent', () => {
  let component: CommitteeViewEditComponent;
  let fixture: ComponentFixture<CommitteeViewEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommitteeViewEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommitteeViewEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
