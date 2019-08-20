import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContinueRegisteringDataComponent } from './continue-registering-data.component';

describe('ContinueRegisteringDataComponent', () => {
  let component: ContinueRegisteringDataComponent;
  let fixture: ComponentFixture<ContinueRegisteringDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContinueRegisteringDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContinueRegisteringDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
