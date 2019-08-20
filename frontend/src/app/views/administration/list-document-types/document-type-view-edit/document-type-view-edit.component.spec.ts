import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentTypeViewEditComponent } from './document-type-view-edit.component';

describe('DocumentTypeViewEditComponent', () => {
  let component: DocumentTypeViewEditComponent;
  let fixture: ComponentFixture<DocumentTypeViewEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentTypeViewEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentTypeViewEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
