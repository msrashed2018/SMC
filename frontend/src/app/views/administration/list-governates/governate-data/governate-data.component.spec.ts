import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GovernateDataComponent } from './governate-data.component';

describe('GovernateDataComponent', () => {
  let component: GovernateDataComponent;
  let fixture: ComponentFixture<GovernateDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GovernateDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GovernateDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
