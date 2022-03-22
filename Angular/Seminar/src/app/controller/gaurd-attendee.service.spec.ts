import { TestBed } from '@angular/core/testing';

import { GaurdAttendeeService } from './gaurd-attendee.service';

describe('GaurdAttendeeService', () => {
  let service: GaurdAttendeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GaurdAttendeeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
