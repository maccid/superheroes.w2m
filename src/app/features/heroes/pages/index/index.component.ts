import { Component, WritableSignal, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { MatTableModule } from '@angular/material/table';

import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';

import { Hero } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.services';

import { DeleteDialogComponent } from '../../components/deleteDialog.component'
import { TitleCasePipe } from '@angular/common';

@Component({
  standalone: true,
  imports: [MatTableModule, MatButtonModule, RouterLink, TitleCasePipe],
  templateUrl: './index.component.html',
  styleUrls: ['index.component.scss']
})
export class IndexComponent {

  dataSource: WritableSignal<Hero[]> = signal([]);
  displayedColumns: string[] = ['superhero', 'publisher', 'actions'];

  constructor(private heroesService: HeroesService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.heroesService.list().subscribe(heroes => {
      this.dataSource.set(heroes);
    }); 
  }

  openDeleteDialog(id: any): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '400px',
      data: id
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.heroesService.delete(id).subscribe(heroes => {
          console.log('Meter función para borrar el elemento: '+id);
          this.ngOnInit();
        });         
      }
    });
  }

 }
