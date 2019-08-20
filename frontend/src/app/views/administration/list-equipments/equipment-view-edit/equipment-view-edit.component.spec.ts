import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentViewEditComponent } from './equipment-view-edit.component';

describe('EquipmentViewEditComponent', () => {
  let component: EquipmentViewEditComponent;
  let fixture: ComponentFixture<EquipmentViewEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipmentViewEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentViewEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
