import { Component } from '@angular/core';

@Component({
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['home.component.scss']
})
export class HomeComponent {

  ngOnInit(): void {
      console.log(1);
  }
  
 }
