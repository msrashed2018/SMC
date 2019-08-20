import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EyeRevealComponent } from './eye-reveal.component';

describe('EyeRevealComponent', () => {
  let component: EyeRevealComponent;
  let fixture: ComponentFixture<EyeRevealComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EyeRevealComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EyeRevealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
