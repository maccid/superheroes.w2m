import {
  Component,
  OnInit,
  WritableSignal,
  signal,
  inject,
  OnDestroy,
  HostListener,
} from '@angular/core';

import { Router } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';

import { MatDialog } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import {
  MatPaginatorIntl,
  MatPaginatorModule,
} from '@angular/material/paginator';

import { Subject, takeUntil } from 'rxjs';

import { NotifierService } from 'src/app/core/services/notifier.service';
import { Params } from 'src/app/core/interfaces/params.interface';
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
import { getPaginatorIntl } from 'src/app/core/utils/paginator-intl';
import { HttpParams, HttpResponse } from '@angular/common/http';

@Component({
  standalone: true,
  imports: [
    MatCardModule,
    MatPaginatorModule,
    FilterSearchComponent,
    AddButtonComponent,
    ViewModeComponent,
    IndexListComponent,
    IndexGridComponent,
  ],
  providers: [{ provide: MatPaginatorIntl, useValue: getPaginatorIntl() }],
  templateUrl: './index.component.html',
  styleUrls: ['index.component.scss'],
})
export class IndexComponent implements OnInit, OnDestroy {
  private readonly _dialog: MatDialog = inject(MatDialog);
  private readonly _route: Router = inject(Router);
  private readonly _heroesService: HeroesService = inject(HeroesService);
  private readonly _notifierService: NotifierService = inject(NotifierService);
  private readonly _translate: TranslateService = inject(TranslateService);

  private _unsubscribe$ = new Subject<void>();

  readonly feature: string = 'heroes';
  readonly dataSource: WritableSignal<Hero[]> = signal([]);

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

  params: Params = {
    filters: {
      _limit: 15,
      _page: 1,
      superhero_like: '',
    },
    view: 'table',
    count: '0',
  };

  ngOnInit(): void {
    const storedParams = localStorage.getItem(this.feature);

    if (storedParams) this.params = JSON.parse(storedParams);
    else localStorage.setItem(this.feature, JSON.stringify(this.params));

    this.getList();
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

  getList() {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
    this._unsubscribe$ = new Subject<void>();

    const params = new HttpParams({ fromObject: { ...this.params.filters } });

    this._heroesService
      .list(params)
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe((response: HttpResponse<Hero[]>) => {
        const heroes = response.body || [];
        this.params.count = response.headers.get('X-Total-Count') || '0';
        this.dataSource.set(heroes);
      });
  }

  applyFilter(textFilter: string = '') {
    this.params.filters['superhero_like'] = textFilter;
    this.params.filters._page = 1;

    this.getList();
  }

  applyPage(index: number) {
    this.params.filters._page = index + 1;

    this.getList();
  }

  applyView(mode: string = ''): void {
    this.params.view = mode;
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

          this.getList();
        });
      }
    });
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeunloadHandler() {
    localStorage.setItem(this.feature, JSON.stringify(this.params));
  }

  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }
}
