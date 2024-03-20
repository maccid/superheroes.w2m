import { Component, OnInit, inject } from '@angular/core';

import { CommonModule } from '@angular/common';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { LoadingService } from '../../../core/services/loading.service';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit {
  spinnerActive: boolean = true;

  private readonly _loadingService: LoadingService = inject(LoadingService);

  ngOnInit(): void {
    this._loadingService.showSpinner.subscribe((state: boolean): void => {
      this.spinnerActive = state;
    });
  }
}
