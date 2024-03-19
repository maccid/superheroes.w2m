import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from 'src/app/app.component';
import { HeaderComponent } from 'src/app/shared/layout/header/header.component';
import { ToolbarComponent } from 'src/app/shared/layout/toolbar/toolbar.component';
import { LoaderComponent } from 'src/app/shared/layout/loader/loader.component';
import { TranslateModule } from '@ngx-translate/core';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        TranslateModule.forRoot(),
        AppComponent,
        HeaderComponent,
        ToolbarComponent,
        LoaderComponent,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    compiled = fixture.debugElement.nativeElement;
    
    fixture.detectChanges();
  });

  it('Debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('Debe contener HeaderComponent', () => {
    const headerComponent = compiled.querySelector('app-header');
    expect(headerComponent).toBeTruthy();
  });

  it('Debe contener ToolbarComponent', () => {
    const toolbarComponent = compiled.querySelector('app-toolbar');
    expect(toolbarComponent).toBeTruthy();
  });

  it('Debe contener LoaderComponent', () => {
    const loaderComponent = compiled.querySelector('app-loader');
    expect(loaderComponent).toBeTruthy();
  });

  it('Debe contener el enrutador', () => {
    const routerOutlet = compiled.querySelector('router-outlet');
    expect(routerOutlet).toBeTruthy();
  });
  //ToDo: Pruebas lenguaje
});
