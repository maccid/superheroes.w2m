import { TestBed } from '@angular/core/testing';

import { LoadingService } from 'src/app/core/services/loading.service';

describe('GridService', () => {
  let service: LoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoadingService],
    });
    service = TestBed.inject(LoadingService);
  });

  it('Debe crear el servicio', () => {
    expect(service).toBeTruthy();
  });
});
