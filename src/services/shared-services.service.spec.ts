import { TestBed, inject } from '@angular/core/testing';

import { SharedServicesService } from './shared-services.service';

describe('SharedServicesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SharedServicesService]
    });
  });

  it('should be created', inject([SharedServicesService], (service: SharedServicesService) => {
    expect(service).toBeTruthy();
  }));
});
