import { TestBed, inject } from '@angular/core/testing';

import { CustomHttpInterceptorService } from './custom-http-interceptor.service';

describe('CustomHttpInterceptorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomHttpInterceptorService]
    });
  });

  it('should be created', inject([CustomHttpInterceptorService], (service: CustomHttpInterceptorService) => {
    expect(service).toBeTruthy();
  }));
});
