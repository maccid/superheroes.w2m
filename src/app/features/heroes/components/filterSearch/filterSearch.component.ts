
import { Component, Output, EventEmitter } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'filter-search',
  standalone: true,
  templateUrl: './filterSearch.component.html',
  imports:[FormsModule, MatInputModule, MatIconModule, MatButtonModule],
  styleUrls: ['filterSearch.component.scss']
})
export class filterSearchComponent {

  private _filterKey = 'filtroHeroes';

  filterValue: string = '';
  
  @Output() filterText = new EventEmitter<string>();

  ngOnInit(): void {
    this.filterValue = localStorage.getItem(this._filterKey) || '';
  }

  onSearchTextChange(event: any) {
    this.filterText.emit(event.target.value);
  }

  clearText() {
    this.filterValue = '';
    this.filterText.emit("");
  }
}