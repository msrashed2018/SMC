import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EyeRevealSettingDataComponent } from './eye-reveal-setting-data.component';

describe('EyeRevealSettingDataComponent', () => {
  let component: EyeRevealSettingDataComponent;
  let fixture: ComponentFixture<EyeRevealSettingDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EyeRevealSettingDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EyeRevealSettingDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
