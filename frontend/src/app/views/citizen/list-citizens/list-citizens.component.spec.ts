import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCitizensComponent } from './list-citizens.component';

describe('ListCitizensComponent', () => {
  let component: ListCitizensComponent;
  let fixture: ComponentFixture<ListCitizensComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCitizensComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCitizensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
