import { TestBed } from '@angular/core/testing';

import { ChoosePlainService } from './choose-plain.service';

describe('ChoosePlainService', () => {
  let service: ChoosePlainService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChoosePlainService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
