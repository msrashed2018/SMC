import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisabilityDataComponent } from './disability-data.component';

describe('DisabilityDataComponent', () => {
  let component: DisabilityDataComponent;
  let fixture: ComponentFixture<DisabilityDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisabilityDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisabilityDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
