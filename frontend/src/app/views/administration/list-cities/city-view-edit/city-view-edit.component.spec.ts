import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CityViewEditComponent } from './city-view-edit.component';

describe('CityViewEditComponent', () => {
  let component: CityViewEditComponent;
  let fixture: ComponentFixture<CityViewEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CityViewEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CityViewEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
