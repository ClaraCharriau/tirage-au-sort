import { TestBed } from '@angular/core/testing';

import { ClassmateListService } from './classmate-list.service';

describe('ClassmateListService', () => {
  let service: ClassmateListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClassmateListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
