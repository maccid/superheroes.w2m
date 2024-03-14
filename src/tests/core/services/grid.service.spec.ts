import { TestBed } from '@angular/core/testing';

import { GridService } from 'src/app/core/services/grid.service';

describe('GridService', () => {
  let service: GridService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GridService],
    });
    service = TestBed.inject(GridService);
  });

  it('Debe crear el servicio', () => {
    expect(service).toBeTruthy();
  });
});
