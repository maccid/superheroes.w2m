import { Component, WritableSignal, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { MatTableModule } from '@angular/material/table';

import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';

import { Hero } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.services';

import { DeleteDialogComponent } from '../../components/deleteDialog.component'
import { TitleCasePipe } from '@angular/common';
import { SnackbarService } from 'src/app/core/services/snackBar.service';

@Component({
  standalone: true,
  imports: [MatTableModule, MatButtonModule, RouterLink, TitleCasePipe],
  templateUrl: './index.component.html',
  styleUrls: ['index.component.scss']
})
export class IndexComponent {

  dataSource: WritableSignal<Hero[]> = signal([]);
  displayedColumns: string[] = ['superhero', 'publisher', 'actions'];

  constructor(
    private _heroesService: HeroesService, 
    private _dialog: MatDialog,
    private _snackbarService: SnackbarService) { }

  ngOnInit(): void {
    this._heroesService.list().subscribe(heroes => {
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
