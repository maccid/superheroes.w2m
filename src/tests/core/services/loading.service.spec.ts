import { TestBed } from '@angular/core/testing';

import { LoadingService } from 'src/app/core/services/loading.service';

describe('LoadingService', () => {
  let service: LoadingService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [LoadingService],
    });
    service = TestBed.inject(LoadingService);
  });

  it('Debe crear el servicio', () => {
    expect(service).toBeTruthy();
  });

  describe('Mostrar Spinner: Falso -> Oculto, Verdadero -> Visible', () => {
    it('Debe tener estado inicial a falso', () => {
      expect(service.showSpinner.value).toBeFalsy();
    });

    it('Debe incrementar en 1 el nº de peticiones y cambiar estado a verdadero', () => {
      service.handleRequest('show');
      expect(service.showSpinner.value).toBeTruthy();
    });

    it('Debe incrementear y decrementar en 1 el nº de peticiones. Debe terminar con estado a falso', () => {
      service.handleRequest('show');
      service.handleRequest();
      expect(service.showSpinner.value).toBeFalsy();
    });

    it('Debe incrementear 2 veces y decrementar 1  el nº de peticiones. Estado verdadero. Luego vuelve a decrementar en 1 y terminar con estado a falso', () => {
      service.handleRequest('show');
      service.handleRequest('show');
      service.handleRequest();
      expect(service.showSpinner.value)
        .withContext('Estado a verdadero')
        .toBeTruthy();

      service.handleRequest();
      expect(service.showSpinner.value)
        .withContext('Estado a falso')
        .toBeFalsy();
    });
  });
});
