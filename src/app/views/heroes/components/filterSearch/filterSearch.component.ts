import { Component, Output, EventEmitter, OnInit } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-filter',
  standalone: true,
  templateUrl: './filterSearch.component.html',
  imports: [
    FormsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
  ],
  styleUrls: ['filterSearch.component.scss'],
})
export class FilterSearchComponent implements OnInit {
  private _filterKey = 'heroes.search';

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
    this.filterText.emit('');
  }
}
