import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BonesRevealComponent } from './bones-reveal.component';

describe('BonesRevealComponent', () => {
  let component: BonesRevealComponent;
  let fixture: ComponentFixture<BonesRevealComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BonesRevealComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BonesRevealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
