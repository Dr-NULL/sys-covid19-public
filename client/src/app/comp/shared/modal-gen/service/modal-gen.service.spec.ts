import { TestBed } from '@angular/core/testing';

import { ModalGenService } from './modal-gen.service';

describe('ModalGenService', () => {
  let service: ModalGenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalGenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
