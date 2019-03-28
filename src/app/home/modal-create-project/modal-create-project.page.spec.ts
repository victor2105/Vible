import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCreateProjectPage } from './modal-create-project.page';

describe('ModalCreateProjectPage', () => {
  let component: ModalCreateProjectPage;
  let fixture: ComponentFixture<ModalCreateProjectPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCreateProjectPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCreateProjectPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
