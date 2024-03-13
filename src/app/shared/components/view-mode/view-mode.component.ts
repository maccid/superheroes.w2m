import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { FormsModule } from '@angular/forms';

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
  ],
  templateUrl: './view-mode.component.html',
  styleUrls: ['view-mode.component.scss'],
})
export class ViewModeComponent implements OnInit {
  @Input() viewKey: string = '';
  @Output() viewValue = new EventEmitter<string>();

  viewMode: string = 'table';

  ngOnInit(): void {
    this.viewMode = localStorage.getItem(this.viewKey) || 'table';
  }

  onViewChange(mode: string): void {
    this.viewMode = mode;
    this.viewValue.emit(mode);
    localStorage.setItem(this.viewKey, mode);
  }
}
