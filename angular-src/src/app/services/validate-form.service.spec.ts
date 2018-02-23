import { TestBed, inject } from '@angular/core/testing';

import { ValidateFormService } from './validate-form.service';

describe('ValidateFormService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ValidateFormService]
    });
  });

  it('should be created', inject([ValidateFormService], (service: ValidateFormService) => {
    expect(service).toBeTruthy();
  }));
});
