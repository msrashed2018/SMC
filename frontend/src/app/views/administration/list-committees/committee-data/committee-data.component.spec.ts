import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommitteeDataComponent } from './committee-data.component';

describe('CommitteeDataComponent', () => {
  let component: CommitteeDataComponent;
  let fixture: ComponentFixture<CommitteeDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommitteeDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommitteeDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
