import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalGenComponent } from './modal-gen.component';

describe('ModalGenComponent', () => {
  let component: ModalGenComponent;
  let fixture: ComponentFixture<ModalGenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalGenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalGenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
