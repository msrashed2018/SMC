import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentTypeDataComponent } from './document-type-data.component';

describe('DocumentTypeDataComponent', () => {
  let component: DocumentTypeDataComponent;
  let fixture: ComponentFixture<DocumentTypeDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentTypeDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentTypeDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
