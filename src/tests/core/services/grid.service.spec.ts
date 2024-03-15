import { TestBed } from '@angular/core/testing';

import { GridService } from 'src/app/core/services/grid.service';

describe('GridService', () => {
  let service: GridService;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      providers: [GridService],
    });

    service = TestBed.inject(GridService);
  });

  it('Debe crear el servicio', () => {
    expect(service).toBeTruthy();
  });

  describe('Numero columnas', () => {
    it('Debe devolver 1 columna -> Ventana es menor a 1270px', () => {
      spyOnProperty(window, 'innerWidth', 'get').and.returnValue(1269);
      expect(service.getGridColumns()).toEqual(1);
    });

    it('Debe devolver 2 columnas -> Ventana es esta entre 1270px y 1899px', () => {
      spyOnProperty(window, 'innerWidth', 'get').and.returnValue(1500);
      expect(service.getGridColumns()).toEqual(2);
    });

    it('Debe devolver 3 columnas -> Ventana es mayor a 1899px', () => {
      spyOnProperty(window, 'innerWidth', 'get').and.returnValue(2000);
      expect(service.getGridColumns()).toEqual(3);
    });
  });

  describe('Tamaño de fila', () => {
    it('Deber ser 500px -> Ventana es menor que 600px', () => {
      spyOnProperty(window, 'innerWidth', 'get').and.returnValue(599);
      expect(service.getSizeHeight()).toEqual(500);
    });

    it('Deber ser 260px -> Ventana es mayor que 599px', () => {
      spyOnProperty(window, 'innerWidth', 'get').and.returnValue(600);
      expect(service.getSizeHeight()).toEqual(260);
    });
  });
});
