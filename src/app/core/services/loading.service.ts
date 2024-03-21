import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private _numberOfRequests: number = 0;
  public readonly showSpinner: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  isLoading = (): boolean => {
    return this._numberOfRequests > 0;
  };

  handleRequest = (state: string = 'hide'): void => {
    this._numberOfRequests =
      state === 'show'
        ? this._numberOfRequests + 1
        : this._numberOfRequests - 1;
    this.showSpinner.next(this._numberOfRequests > 0);
  };
}
