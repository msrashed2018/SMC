import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BonesRevealRegisteringDataComponent } from './bones-reveal-registering-data.component';

describe('BonesRevealRegisteringDataComponent', () => {
  let component: BonesRevealRegisteringDataComponent;
  let fixture: ComponentFixture<BonesRevealRegisteringDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BonesRevealRegisteringDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BonesRevealRegisteringDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
