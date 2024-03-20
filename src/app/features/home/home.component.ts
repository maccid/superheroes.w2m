import { Component } from '@angular/core';

import { MatExpansionModule } from '@angular/material/expansion';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  standalone: true,
  imports: [MatExpansionModule, TranslateModule],
  templateUrl: './home.component.html',
  styleUrls: ['home.component.scss'],
})
export class HomeComponent {}
