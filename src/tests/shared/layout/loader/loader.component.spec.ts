import { By } from '@angular/platform-browser';

import { TestBed, ComponentFixture } from '@angular/core/testing';

import { LoadingService } from 'src/app/core/services/loading.service';

import { LoaderComponent } from 'src/app/shared/layout/loader/loader.component';
import { Predicate, DebugElement } from '@angular/core';

describe('LoaderComponent', () => {
  let component: LoaderComponent;
  let fixture: ComponentFixture<LoaderComponent>;

  let loadingService: LoadingService;
  let container: Predicate<DebugElement>;

  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoaderComponent],
      providers: [LoadingService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaderComponent);
    component = fixture.componentInstance;
    compiled = fixture.debugElement.nativeElement;
    loadingService = TestBed.inject(LoadingService);

    container = By.css('.loading-container');
    fixture.detectChanges();
  });

  it('Debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('Comprobar Spinner cuando showSpinner cambie de estado', () => {
    //ShowSpinner = false; No debe aparecer
    const loadingContainer = fixture.debugElement.query(container);
    expect(loadingContainer).toBeNull();

    loadingService.showSpinner.next(true);
    fixture.detectChanges();

    //Debe contener MatSpinner
    const MatSpinner = compiled.querySelector('mat-spinner');
    expect(MatSpinner).toBeTruthy();

    //ShowSpinner = true; Debe aparecer
    let updatedLoadingContainer = fixture.debugElement.query(container);
    expect(updatedLoadingContainer).not.toBeNull();

    loadingService.showSpinner.next(false);
    fixture.detectChanges();

    //ShowSpinner = false; No debe aparecer
    updatedLoadingContainer = fixture.debugElement.query(container);
    expect(updatedLoadingContainer).toBeNull();
  });
});
