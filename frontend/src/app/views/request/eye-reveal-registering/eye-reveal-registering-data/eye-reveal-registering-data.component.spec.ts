import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EyeRevealRegisteringDataComponent } from './eye-reveal-registering-data.component';

describe('EyeRevealRegisteringDataComponent', () => {
  let component: EyeRevealRegisteringDataComponent;
  let fixture: ComponentFixture<EyeRevealRegisteringDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EyeRevealRegisteringDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EyeRevealRegisteringDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
