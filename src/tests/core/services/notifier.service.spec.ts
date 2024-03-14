import { TestBed } from '@angular/core/testing';

import { MatSnackBar } from '@angular/material/snack-bar';

import { NotifierService } from 'src/app/core/services/notifier.service';

describe('NotifierService', () => {
  let service: NotifierService;
  let snackBar: MatSnackBar;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotifierService],
    });

    service = TestBed.inject(NotifierService);
    snackBar = TestBed.inject(MatSnackBar);
  });

  it('Debe crear el servicio', () => {
    expect(service).toBeTruthy();
  });

  it('Debe mostrar notificación erronea y coincidir con la respuesta predefinida erronea', () => {
    const openSpyStub = spyOn(snackBar, 'open').and.stub();

    const errorMessage = 'Error message';
    service.openError(errorMessage);

    expect(openSpyStub).toHaveBeenCalledWith(errorMessage, 'Cerrar', {
      duration: 2000,
      panelClass: ['error-snackbar'],
    });
  });

  it('Debe mostrar notificación exitosa y coincidir con la respuesta predefinida exitosa', () => {
    const openSpyStub = spyOn(snackBar, 'open').and.stub();

    const successMessage = 'Success message';
    service.openSuccess(successMessage);

    expect(openSpyStub).toHaveBeenCalledWith(successMessage, 'Cerrar', {
      duration: 2000,
      panelClass: ['success-snackbar'],
    });
  });
});
