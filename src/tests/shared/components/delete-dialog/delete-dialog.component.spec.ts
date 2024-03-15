import { TestBed, ComponentFixture } from '@angular/core/testing';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';

import { DeleteDialogComponent } from 'src/app/shared/components/delete-dialog/delete-dialog.component';

describe('DeleteDialogComponent', () => {
  let component: DeleteDialogComponent;
  let fixture: ComponentFixture<DeleteDialogComponent>;

  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<DeleteDialogComponent>>;

  const id: string = 'dc-batman';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteDialogComponent, MatDialogModule],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: id },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteDialogComponent);
    component = fixture.componentInstance;

    dialogRefSpy = TestBed.inject(MatDialogRef) as jasmine.SpyObj<MatDialogRef<DeleteDialogComponent>>;

    fixture.detectChanges();
  });

  it('Debe crear el componente', () => {
    expect(component).toBeTruthy();
  });
});
