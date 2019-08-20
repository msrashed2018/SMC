import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EyeRevealSettingViewEditComponent } from './eye-reveal-setting-view-edit.component';

describe('EyeRevealSettingViewEditComponent', () => {
  let component: EyeRevealSettingViewEditComponent;
  let fixture: ComponentFixture<EyeRevealSettingViewEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EyeRevealSettingViewEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EyeRevealSettingViewEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
