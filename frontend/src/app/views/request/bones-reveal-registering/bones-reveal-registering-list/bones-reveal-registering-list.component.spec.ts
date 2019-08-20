import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BonesRevealRegisteringListComponent } from './bones-reveal-registering-list.component';

describe('BonesRevealRegisteringListComponent', () => {
  let component: BonesRevealRegisteringListComponent;
  let fixture: ComponentFixture<BonesRevealRegisteringListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BonesRevealRegisteringListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BonesRevealRegisteringListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
