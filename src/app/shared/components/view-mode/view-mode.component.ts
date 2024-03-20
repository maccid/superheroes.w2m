import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { View } from 'src/app/core/interfaces/view.interface';

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
  @Input({ required: true }) options: View = {} as View;
  @Output() mode = new EventEmitter<string>();

  ngOnInit(): void {
    this.options.mode = localStorage.getItem(this.options.key) || 'table';
  }

  onViewChange(mode: string): void {
    this.options.mode = mode;
    this.mode.emit(mode);
    localStorage.setItem(this.options.key, mode);
  }
}
