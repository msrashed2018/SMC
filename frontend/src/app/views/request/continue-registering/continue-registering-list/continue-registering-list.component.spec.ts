import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContinueRegisteringListComponent } from './continue-registering-list.component';

describe('ContinueRegisteringListComponent', () => {
  let component: ContinueRegisteringListComponent;
  let fixture: ComponentFixture<ContinueRegisteringListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContinueRegisteringListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContinueRegisteringListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
