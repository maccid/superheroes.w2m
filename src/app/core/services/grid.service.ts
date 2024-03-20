import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class GridService {
  getGridColumns(): number {
    const windowWidth = window.innerWidth;
    if (windowWidth < 1270) {
      return 1;
    } else if (windowWidth < 1900) {
      return 2;
    } else {
      return 3;
    }
  }

  getSizeHeight(): number {
    const windowWidth = window.innerWidth;
    if (windowWidth < 600) {
      return 500;
    } else {
      return 260;
    }
  }
}
