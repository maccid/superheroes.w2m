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

import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { Hero } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.services';

import { DeleteDialogComponent } from '../../components/deleteDialog/deleteDialog.component';
import { filterSearchComponent } from '../../components/filterSearch/filterSearch.component';

import { NotifierService } from 'src/app/core/services/notifier.service';
import { Subject, takeUntil } from 'rxjs';

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
    filterSearchComponent,
  ],
  templateUrl: './index.component.html',
  styleUrls: ['index.component.scss'],
})
export class IndexComponent implements OnInit {
  @Input() searchFilter: string = '';
  dataSource: WritableSignal<Hero[]> = signal([]);
  displayedColumns: string[] = [
    'superhero',
    'alter_ego',
    'publisher',
    'actions',
  ];

  private _filterKey = 'heroes.search';
  private _unsubscribe$ = new Subject<void>();

  constructor(
    private _heroesService: HeroesService,
    private _dialog: MatDialog,
    private _notifierService: NotifierService,
    private _breakpointObserver: BreakpointObserver,
  ) {}

  ngOnInit(): void {
    const filterText = localStorage.getItem(this._filterKey) || '';

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
    localStorage.setItem(this._filterKey, filterText);

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
