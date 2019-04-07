import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditCelPage } from './modal-edit-cel.page';

describe('ModalEditCelPage', () => {
  let component: ModalEditCelPage;
  let fixture: ComponentFixture<ModalEditCelPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalEditCelPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEditCelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
