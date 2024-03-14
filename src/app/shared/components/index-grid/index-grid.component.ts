import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';

import { Fields } from 'src/app/core/interfaces/fields.interface';
import { Actions } from 'src/app/core/interfaces/actions.interface';
import { GridService } from 'src/app/core/services/grid.service';

@Component({
  selector: 'app-index-grid',
  standalone: true,
  imports: [
    CommonModule,
    MatGridListModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatCardModule,
  ],
  templateUrl: './index-grid.component.html',
  styleUrl: './index-grid.component.css',
})
export class IndexGridComponent {
  @Input({ required: true }) fields: Fields[] = [];
  @Input({ required: false }) actions: Actions[] = [];
  @Input({ required: true }) dataSource: any[] = [];

  @Output() actionEvent: EventEmitter<{ action: string; id: string }> =
    new EventEmitter<{ action: string; id: string }>();

  displayedColumns: string[] = [];

  constructor(private _gridService: GridService) {}

  onClickElement(action: string, id: string): void {
    this.actionEvent.emit({ action, id });
  }

  getGridColumns(): number {
    return this._gridService.getGridColumns();
  }

  getSizeHeight(): number {
    return this._gridService.getSizeHeight();
  }

  isVertical(): boolean {
    return window.innerWidth >= 600;
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.getGridColumns();
    this.getSizeHeight();
  }

  getDefaultImage(idx: number): void {
    const img = document.querySelectorAll('img[mat-card-xl-image]');
    const select = img[idx] as HTMLImageElement;

    if (select) {
      select.src = 'assets/heroes/default.jpg';
    }
  }

}