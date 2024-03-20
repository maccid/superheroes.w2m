import {
  Component,
  OnInit,
  WritableSignal,
  signal,
  inject,
} from '@angular/core';

import { Router } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';

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
  private readonly _dialog: MatDialog = inject(MatDialog);
  private readonly _route: Router = inject(Router);
  private readonly _heroesService: HeroesService = inject(HeroesService);
  private readonly _notifierService: NotifierService = inject(NotifierService);
  private readonly _translate: TranslateService = inject(TranslateService);

  private _unsubscribe$ = new Subject<void>();

  readonly imageRoute: string = 'heroes';
  readonly routeAdd: string = '/heroes/add';
  readonly tooltipAdd: string = 'features.heroes.add';
  readonly filterKey: string = 'heroes.search';

  readonly view: View = {
    key: 'heroes.view',
    mode: '',
  };

  readonly fields: Fields[] = [
    {
      name: 'superhero',
      label: 'features.heroes.fields.name',
      flex: 2,
      titlecase: true,
    },
    { name: 'alter_ego', label: 'features.heroes.fields.alter_ego', flex: 2 },
    {
      name: 'publisher',
      label: 'features.heroes.fields.publisher',
      flex: 2,
      hide: ['sm'],
    },
    {
      name: 'first_appearance',
      label: 'features.heroes.fields.first_appearance',
      flex: 2,
      hide: ['sm', 'md'],
    },
  ];

  readonly actions: Actions[] = [
    { name: 'edit', label: 'features.actions.edit' },
    { name: 'delete', label: 'features.actions.delete' },
  ];

  readonly dataSource: WritableSignal<Hero[]> = signal([]);

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
      width: '500px',
      data: id,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._heroesService.delete(id).subscribe(() => {
          const message = this._translate.instant('notify.hero.delete', { id });

          this._notifierService.openSuccess(message);

          this.ngOnInit();
        });
      }
    });
  }
}
