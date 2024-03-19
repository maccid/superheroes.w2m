import {
  Component,
  OnInit,
  Input,
  WritableSignal,
  signal,
} from '@angular/core';

import { Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';

import { Subject, takeUntil } from 'rxjs';

import { NotifierService } from 'src/app/core/services/notifier.service';
import { View } from 'src/app/core/interfaces/view.interface';
import { Fields } from 'src/app/core/interfaces/fields.interface';
import { Actions } from 'src/app/core/interfaces/actions.interface';

import { AddButtonComponent } from 'src/app/shared/components/add-button/add-button.component';
import { DeleteDialogComponent } from 'src/app/shared/components/delete-dialog/delete-dialog.component';
import { FilterSearchComponent } from 'src/app/shared/components/filter-search/filter-search.component';
import { ViewModeComponent } from 'src/app/shared/components/view-mode/view-mode.component';
import { IndexGridComponent } from 'src/app/shared/components/index-grid/index-grid.component';
import { IndexListComponent } from 'src/app/shared/components/index-list/index-list.component';

import { HeroesService } from '../../services/heroes.services';
import { Hero } from '../../models/heroes.interface';

@Component({
  standalone: true,
  imports: [
    MatCardModule,
    FilterSearchComponent,
    AddButtonComponent,
    ViewModeComponent,
    IndexListComponent,
    IndexGridComponent,
  ],
  templateUrl: './index.component.html',
  styleUrls: ['index.component.scss'],
})
export class IndexComponent implements OnInit {
  @Input() searchFilter: string = '';

  route: string = '/heroes/add';
  tooltipAdd: string = 'Añadir Heroe';
  filterKey: string = 'heroes.search';

  view: View = {
    key: 'heroes.view',
    mode: '',
  };

  fields: Fields[] = [
    { name: 'superhero', label: 'Heroe', flex: 2, titlecase: true },
    { name: 'alter_ego', label: 'Personaje', flex: 2 },
    { name: 'publisher', label: 'Editorial', flex: 2, hide: ['sm'] },
    { name: 'first_appearance', label: 'Estreno', flex: 2, hide: ['sm', 'md'] },
  ];

  actions: Actions[] = [
    { name: 'edit', label: 'Editar' },
    { name: 'delete', label: 'Eliminar' },
  ];

  dataSource: WritableSignal<Hero[]> = signal([]);

  private _unsubscribe$ = new Subject<void>();

  constructor(
    private _heroesService: HeroesService,
    private _route: Router,
    private _dialog: MatDialog,
    private _notifierService: NotifierService,
  ) {}

  ngOnInit(): void {
    const filterText = localStorage.getItem(this.filterKey) || '';
    const viewValue = localStorage.getItem(this.view.key) || '';

    this.applyFilter(filterText);
    this.applyView(viewValue);
  }

  actionEvent(event: { action: string; id: string }) {
    switch (event.action) {
      case 'edit':
        this._route.navigateByUrl('heroes/edit/' + event.id);
        break;
      case 'delete':
        this.openDeleteDialog(event.id);
        break;
    }
  }

  applyFilter(filterText: string = '') {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
    this._unsubscribe$ = new Subject<void>();

    const params = filterText ? `?superhero_like=${filterText}` : ``;

    this._heroesService
      .list(params)
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe((heroes: Hero[]) => {
        this.dataSource.set(heroes);
      });
  }

  applyView(viewValue: string = '') {
    this.view.mode = viewValue;
  }

  openDeleteDialog(id: string): void {
    const dialogRef = this._dialog.open(DeleteDialogComponent, {
      width: '400px',
      data: id,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._heroesService.delete(id).subscribe(() => {
          const message = `El heroe ${id} ha sido borrado correctamente`;

          this._notifierService.openSuccess(message);

          this.ngOnInit();
        });
      }
    });
  }
}
