import { TestBed } from '@angular/core/testing';

import { AuthorisationServiceService } from './authorisation-service.service';

describe('AuthorisationServiceService', () => {
  let service: AuthorisationServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthorisationServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
