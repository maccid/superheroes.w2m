
import { Component, Inject } from '@angular/core';

import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'delete-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  template: `
    <div mat-dialog-content>
      <p>¿Deseas eliminar el elemento {{id}}?</p>
    </div>
    <div mat-dialog-actions>
      <button mat-button [mat-dialog-close]="false">Cancelar</button>
      <button mat-button color="warn" [mat-dialog-close]="true">Eliminar</button>
    </div>
  `,
})
export class DeleteDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public id: any) {}

}
