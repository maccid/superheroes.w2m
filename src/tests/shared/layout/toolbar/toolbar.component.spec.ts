import { TestBed, ComponentFixture } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';

import { ToolbarComponent } from 'src/app/shared/layout/toolbar/toolbar.component';

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;

  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, ToolbarComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
    compiled = fixture.debugElement.nativeElement;

    fixture.detectChanges();
  });

  it('Debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('Debe contener BreadcrumbComponent', () => {
    const breadcrumbComponent = compiled.querySelector('app-breadcrumb');
    expect(breadcrumbComponent).toBeTruthy();
  });

  it('Debe contener MatToolbar con su clase', () => {
    const matToolbar = compiled.querySelector('mat-toolbar');
    expect(matToolbar).toBeTruthy();
    expect(matToolbar?.classList.contains('mat-elevation-z5')).toBeTruthy();
  });
});
