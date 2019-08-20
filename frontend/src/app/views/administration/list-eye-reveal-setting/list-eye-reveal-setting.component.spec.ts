import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEyeRevealSettingComponent } from './list-eye-reveal-setting.component';

describe('ListEyeRevealSettingComponent', () => {
  let component: ListEyeRevealSettingComponent;
  let fixture: ComponentFixture<ListEyeRevealSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListEyeRevealSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListEyeRevealSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
