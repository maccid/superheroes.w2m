import { Component } from '@angular/core';

import { Hero } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.services';

@Component({
  standalone: true,
  templateUrl: './index.component.html',
  styleUrls: ['index.component.scss']
})
export class IndexComponent {

  heroes:Hero[]=[];

  constructor(private heroesService: HeroesService) { }

  ngOnInit(): void {
    this.heroesService.getHeroes().subscribe(heroes => this.heroes= heroes); 
  }

 }
