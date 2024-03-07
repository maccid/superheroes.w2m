import { Component } from '@angular/core';

import { RouterLink } from '@angular/router';

//import { FlexLayoutModule } from '@angular/flex-layout';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    RouterLink,
    //FlexLayoutModule
  ],
  templateUrl: './header.component.html',

  styleUrls: ['./header.component.scss']
})
export class HeaderComponent { }
