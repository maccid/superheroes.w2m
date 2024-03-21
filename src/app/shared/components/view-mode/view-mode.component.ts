import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-view-mode',
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
  templateUrl: './view-mode.component.html',
  styleUrls: ['view-mode.component.scss'],
})
export class ViewModeComponent implements OnInit {
  @Input({ required: true }) feature: string = '';
  @Output() mode = new EventEmitter<string>();

  selected = '';

  ngOnInit(): void {
    const storedParams = localStorage.getItem(this.feature) || '';
    const params = JSON.parse(storedParams);
    this.selected = params.view;
  }

  onViewChange(mode: string): void {
    this.selected = mode;
    this.mode.emit(mode);
  }
}
