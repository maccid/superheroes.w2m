import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-add-button',
  standalone: true,
  imports: [RouterLink, MatButtonModule, MatTooltipModule, TranslateModule],
  templateUrl: './add-button.component.html',
  styleUrls: ['./add-button.component.scss'],
})
export class AddButtonComponent {
  @Input({ required: true }) feature: string = '';
}
