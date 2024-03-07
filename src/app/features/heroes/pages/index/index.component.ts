import { Component, WritableSignal, signal } from '@angular/core';

import { MatTableModule } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';


import { Hero } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.services';

@Component({
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './index.component.html',
  styleUrls: ['index.component.scss']
})
export class IndexComponent {

  dataSource: WritableSignal<Hero[]> = signal([]);
  heroes$: MatTableDataSource<Hero> = new MatTableDataSource<Hero>(); 
  displayedColumns: string[] = ['superhero', 'publisher'];

  constructor(private heroesService: HeroesService) { }

  ngOnInit(): void {
    this.heroesService.getHeroes().subscribe(heroes => {
      console.log(heroes)
      this.dataSource.set(heroes);
      this.heroes$ = new MatTableDataSource(heroes); 
    }); 
  }

 }
