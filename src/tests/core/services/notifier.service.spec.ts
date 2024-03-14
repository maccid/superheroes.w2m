import { TestBed } from '@angular/core/testing';

import { NotifierService } from 'src/app/core/services/notifier.service';

describe('GridService', () => {
  let service: NotifierService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotifierService],
    });
    service = TestBed.inject(NotifierService);
  });

  it('Debe crear el servicio', () => {
    expect(service).toBeTruthy();
  });
});
