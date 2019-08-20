import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoneViewEditComponent } from './zone-view-edit.component';

describe('ZoneViewEditComponent', () => {
  let component: ZoneViewEditComponent;
  let fixture: ComponentFixture<ZoneViewEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZoneViewEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoneViewEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
