import { Component, Output, EventEmitter, OnInit, Input } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [
    FormsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatTooltipModule,
  ],
  templateUrl: './filter-search.component.html',
  styleUrls: ['filter-search.component.scss'],
})
export class FilterSearchComponent implements OnInit {
  @Input() filterKey: string = '';
  @Output() filterText = new EventEmitter<string>();

  filterValue: string = '';

  ngOnInit(): void {
    this.filterValue = localStorage.getItem(this.filterKey) || '';
  }

  onSearchTextChange(event: any) {
    this.filterText.emit(event.target.value);
  }

  clearText() {
    this.filterValue = '';
    this.filterText.emit('');
  }
}
