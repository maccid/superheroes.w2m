import { Component, Input, WritableSignal, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TitleCasePipe } from '@angular/common';

import { MatTableModule } from '@angular/material/table';

import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { Hero } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.services';

import { DeleteDialogComponent } from '../../components/deleteDialog/deleteDialog.component'
import { filterSearchComponent } from '../../components/filterSearch/filterSearch.component';

import { SnackbarService } from 'src/app/core/services/snackbar.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatIconModule, RouterLink, TitleCasePipe, filterSearchComponent],
  templateUrl: './index.component.html',
  styleUrls: ['index.component.scss']
})
export class IndexComponent {

  @Input() searchFilter: string = '';
  dataSource: WritableSignal<Hero[]> = signal([]);
  displayedColumns: string[] = ['superhero', 'publisher', 'actions'];

  private _filterKey = 'filtroHeroes';
  private _unsubscribe$ = new Subject<void>();
  
  constructor(
    private _heroesService: HeroesService, 
    private _dialog: MatDialog,
    private _snackbarService: SnackbarService) { }

  ngOnInit(): void {
    const filterText = localStorage.getItem(this._filterKey) || '';

    this.applyFilter(filterText); 
  }

  applyFilter(filterText: string = '') {

    localStorage.setItem(this._filterKey, filterText);

    this._unsubscribe$.next();
    this._unsubscribe$.complete();
    this._unsubscribe$ = new Subject<void>();
    
    const params = filterText? `?superhero_like=${filterText}` :``;+        
    this._heroesService.list(params)
    .pipe(
      takeUntil(this._unsubscribe$)
    )
    .subscribe(heroes => {
      this.dataSource.set(heroes);
    }); 
  
  }

  openDeleteDialog(id: any): void {
    const dialogRef = this._dialog.open(DeleteDialogComponent, {
      width: '400px',
      data: id
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this._heroesService.delete(id).subscribe(heroes => {
          this._snackbarService.openSuccess('El heroe '+id+' ha borrado correctamente');
          this.ngOnInit();
        });         
      }
    });
  }

 }
