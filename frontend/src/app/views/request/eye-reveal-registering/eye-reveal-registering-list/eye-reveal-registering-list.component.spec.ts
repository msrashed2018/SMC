import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EyeRevealRegisteringListComponent } from './eye-reveal-registering-list.component';

describe('EyeRevealRegisteringListComponent', () => {
  let component: EyeRevealRegisteringListComponent;
  let fixture: ComponentFixture<EyeRevealRegisteringListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EyeRevealRegisteringListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EyeRevealRegisteringListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
