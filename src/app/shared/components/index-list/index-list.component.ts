import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { TitleCasePipe } from '@angular/common';

import { Subscription, fromEvent } from 'rxjs';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { Fields } from 'src/app/core/interfaces/fields.interface';
import { Actions } from 'src/app/core/interfaces/actions.interface';
import { DataSource } from 'src/app/core/interfaces/data-source.interface';

@Component({
  selector: 'app-index-list',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatIconModule, MatTooltipModule, TitleCasePipe],
  templateUrl: './index-list.component.html',
  styleUrl: './index-list.component.css',
})
export class IndexListComponent implements OnInit, OnDestroy {
  @Input({ required: true }) fields: Fields[] = [];
  @Input({ required: false }) actions: Actions[] = [];
  @Input({ required: true }) dataSource: DataSource[] = [];

  @Output() actionEvent: EventEmitter<{ action: string; id: string }> =
    new EventEmitter<{ action: string; id: string }>();

  displayedColumns: string[] = [];

  private _subscription: Subscription = new Subscription();

  constructor() {}

  ngOnInit(): void {
    this._subscription = fromEvent(window, 'resize').subscribe(() => {
      this._handleColumns();
    });

    this._handleColumns();
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  onClickElement(action: string, id: string): void {
    this.actionEvent.emit({ action, id });
  }

  private _handleColumns(): void {
    const size: string =
      window.innerWidth < 600 ? 'sm' : window.innerWidth < 900 ? 'md' : '';

    this.displayedColumns = this.fields
      .filter((field) => !field.hide || !field.hide.includes(size))
      .map((field) => field.name);

    if (this.actions.length) this.displayedColumns.push('actions');
  }
}
