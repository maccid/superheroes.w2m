import { By } from '@angular/platform-browser';

import { TestBed, ComponentFixture } from '@angular/core/testing';

import { LoadingService } from 'src/app/core/services/loading.service';

import { LoaderComponent } from 'src/app/shared/layout/loader/loader.component';
import { Predicate, DebugElement } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

describe('LoaderComponent', () => {
  let component: LoaderComponent;
  let fixture: ComponentFixture<LoaderComponent>;

  let container: Predicate<DebugElement>;
  let loadingServiceSpy: jasmine.SpyObj<LoadingService>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoaderComponent],
      providers: [
        {
          provide: LoadingService,
          useValue: {
            showSpinner: new BehaviorSubject<boolean>(false),
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaderComponent);
    component = fixture.componentInstance;
    compiled = fixture.debugElement.nativeElement;
    loadingServiceSpy = TestBed.inject(LoadingService) as jasmine.SpyObj<LoadingService>;

    container = By.css('.loading-container');
    fixture.detectChanges();
  });

  it('Debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('Comprobar Spinner cuando showSpinner cambie de estado', () => {
    const loadingContainer = fixture.debugElement.query(container);
    expect(loadingContainer).withContext('ShowSpinner = false; No debe aparecer').toBeNull();

    loadingServiceSpy.showSpinner.next(true);
    fixture.detectChanges();

    const MatSpinner = compiled.querySelector('mat-spinner');
    expect(MatSpinner).withContext('Debe contener MatSpinner').toBeTruthy();

    let updatedLoadingContainer = fixture.debugElement.query(container);
    expect(updatedLoadingContainer).withContext('ShowSpinner = true; Debe aparecer').not.toBeNull();

    loadingServiceSpy.showSpinner.next(false);
    fixture.detectChanges();

    updatedLoadingContainer = fixture.debugElement.query(container);
    expect(updatedLoadingContainer).withContext('ShowSpinner = false; No debe aparecer').toBeNull();
  });
});
