import { Component, inject } from '@angular/core';

import { TranslateModule } from '@ngx-translate/core';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, TranslateModule],
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['delete-dialog.component.scss'],
})
export class DeleteDialogComponent {
  readonly id: string = inject(MAT_DIALOG_DATA);
}
