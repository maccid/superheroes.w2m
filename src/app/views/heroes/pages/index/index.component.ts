import {
  Component,
  OnInit,
  Input,
  WritableSignal,
  signal,
} from '@angular/core';

import { RouterLink } from '@angular/router';
import { TitleCasePipe } from '@angular/common';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatGridListModule } from '@angular/material/grid-list';

import { Subject, takeUntil } from 'rxjs';

import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { NotifierService } from 'src/app/core/services/notifier.service';

import { AddButtonComponent } from 'src/app/shared/components/add-button/add-button.component';

import { Hero } from '../../heroes.interface';
import { HeroesService } from '../../heroes.services';

import { DeleteDialogComponent } from 'src/app/shared/components/delete-dialog/delete-dialog.component';
import { FilterSearchComponent } from 'src/app/shared/components/filter-search/filter-search.component';

@Component({
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatGridListModule,
    MatTooltipModule,
    RouterLink,
    TitleCasePipe,
    FilterSearchComponent,
    AddButtonComponent,
  ],
  templateUrl: './index.component.html',
  styleUrls: ['index.component.scss'],
})
export class IndexComponent implements OnInit {
  @Input() searchFilter: string = '';

  route: string = '/heroes/add';
  tooltipAdd: string = 'Añadir Heroe';
  filterKey: string = 'heroes.search';
  viewKey: string = 'heroes.view'

  dataSource: WritableSignal<Hero[]> = signal([]);
  displayedColumns: string[] = [
    'superhero',
    'alter_ego',
    'publisher',
    'actions',
  ];
  private _unsubscribe$ = new Subject<void>();

  constructor(
    private _heroesService: HeroesService,
    private _dialog: MatDialog,
    private _notifierService: NotifierService,
    private _breakpointObserver: BreakpointObserver,
  ) {}

  ngOnInit(): void {
    const filterText = localStorage.getItem(this.filterKey) || '';

    this._breakpointObserver
      .observe([Breakpoints.HandsetPortrait, Breakpoints.HandsetLandscape])
      .subscribe((result) => {
        if (result.matches && window.innerWidth < 600) {
          this.displayedColumns = ['superhero', 'alter_ego', 'actions'];
        } else {
          this.displayedColumns = [
            'superhero',
            'alter_ego',
            'publisher',
            'actions',
          ];
        }
      });

    this.applyFilter(filterText);
  }

  applyFilter(filterText: string = '') {
    localStorage.setItem(this.filterKey, filterText);

    this._unsubscribe$.next();
    this._unsubscribe$.complete();
    this._unsubscribe$ = new Subject<void>();

    const params = filterText ? `?superhero_like=${filterText}` : ``;
    +this._heroesService
      .list(params)
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe((heroes) => {
        this.dataSource.set(heroes);
      });
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
