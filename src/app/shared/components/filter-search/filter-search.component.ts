import { Component, Output, EventEmitter, OnInit, Input } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

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
    TranslateModule,
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        subscriptSizing: 'dynamic',
      },
    },
  ],
  templateUrl: './filter-search.component.html',
  styleUrls: ['filter-search.component.scss'],
})
export class FilterSearchComponent implements OnInit {
  @Input({ required: true }) feature: string = '';
  @Input({ required: true }) field: string = '';
  @Output() search = new EventEmitter<string>();

  filterValue: string = '';

  ngOnInit(): void {
    const storedParams = localStorage.getItem(this.feature);
    if (storedParams) {
      const params = JSON.parse(storedParams);
      this.filterValue = params.filters[this.field];
    }
  }

  onSearchTextChange(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.search.emit(filterValue);
  }

  clearText(): void {
    this.filterValue = '';
    this.search.emit('');
  }
}
