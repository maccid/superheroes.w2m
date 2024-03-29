import { TestBed } from '@angular/core/testing';

import { TranslateModule } from '@ngx-translate/core';

import { MatSnackBar } from '@angular/material/snack-bar';

import { NotifierService } from 'src/app/core/services/notifier.service';

describe('NotifierService', () => {
  let service: NotifierService;
  let snackBar: MatSnackBar;

  let openSpyStub: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot(),
      ],
      providers: [NotifierService],
    });

    service = TestBed.inject(NotifierService);
    snackBar = TestBed.inject(MatSnackBar);
    openSpyStub = spyOn(snackBar, 'open').and.stub();
  });

  it('Debe crear el servicio', () => {
    expect(service).toBeTruthy();
  });

  it('Debe mostrar notificación erronea y coincidir con la respuesta predefinida erronea', () => {
    const errorMessage = 'Error message';
    service.openError(errorMessage);

    expect(openSpyStub).toHaveBeenCalledOnceWith(errorMessage, 'notify.close', {
      duration: 2000,
      panelClass: ['error-snackbar'],
    });
  });

  it('Debe mostrar notificación exitosa y coincidir con la respuesta predefinida exitosa', () => {
    const successMessage = 'Success message';
    service.openSuccess(successMessage);

    expect(openSpyStub).toHaveBeenCalledOnceWith(successMessage, 'notify.close', {
      duration: 2000,
      panelClass: ['success-snackbar'],
    });
  });
});
