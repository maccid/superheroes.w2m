import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';

import { IndexComponent } from 'src/app/features/heroes/pages/index/index.component';
import { HeroesService } from 'src/app/features/heroes/services/heroes.services';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import {
  Hero,
  Publisher,
} from 'src/app/features/heroes/models/heroes.interface';
import { HttpParams, HttpResponse } from '@angular/common/http';

describe('IndexComponent', () => {
  let component: IndexComponent;
  let fixture: ComponentFixture<IndexComponent>;

  let heroesServiceSpy: jasmine.SpyObj<HeroesService>;
  let notifierServiceSpy: jasmine.SpyObj<NotifierService>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        NoopAnimationsModule,
        TranslateModule.forRoot(),
        IndexComponent,
      ],
      providers: [
        {
          provide: HeroesService,
          useValue: jasmine.createSpyObj('HeroesService', {
            list: of([]),
            delete: of([]),
          }),
        },
        {
          provide: NotifierService,
          useValue: jasmine.createSpyObj('NotifierService', ['openSuccess']),
        },
        {
          provide: MatDialog,
          useValue: jasmine.createSpyObj('MatDialog', ['open']),
        },
      ],
    }).compileComponents();

    heroesServiceSpy = TestBed.inject(
      HeroesService,
    ) as jasmine.SpyObj<HeroesService>;
    notifierServiceSpy = TestBed.inject(
      NotifierService,
    ) as jasmine.SpyObj<NotifierService>;
    dialogSpy = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('Debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('Debe inicializar con parametros por defecto y hacer la petición de listado', () => {
    const params = {
      filters: {
        _limit: 15,
        _page: 1,
        superhero_like: '',
      },
      view: 'table',
      count: '0',
    };

    expect(component.feature).toEqual('heroes');
    expect(component.params).toEqual(params);

    expect(component.fields.length).toBeGreaterThan(0);
    expect(component.actions.length).toBeGreaterThan(0);

    spyOn(component, 'getList');

    component.ngOnInit();
    expect(component.getList).toHaveBeenCalled();
  });

  it('Debe aplicar filtro de busqueda', () => {
    const textFilter = 'Superman';
    const heroes: Hero[] = [
      {
        id: 'dc-superman',
        superhero: 'Superman',
        publisher: Publisher.DCComics,
        alter_ego: 'Kal-E',
      },
    ];

    const filters = {
      _limit: 15,
      _page: 1,
      superhero_like: '',
    };

    const params = new HttpParams({ fromObject: { ...filters } });

    spyOn(component, 'getList').and.callThrough();

    heroesServiceSpy.list.and.returnValue(
      of(new HttpResponse<Hero[]>({ body: heroes })),
    );

    component.applyFilter(textFilter);

    expect(heroesServiceSpy.list).toHaveBeenCalledWith(params);
    expect(component.getList).toHaveBeenCalled();
    expect(component.dataSource()).toEqual(heroes);
  });

  it('Debe aplicar el filtro y recargar el listado', () => {
    spyOn(component, 'getList');

    const filterText = 'Batman';
    component.applyFilter(filterText);

    expect(component.params.filters['superhero_like']).toEqual(filterText);
    expect(component.params.filters._page).toEqual(1);

    expect(component.getList).toHaveBeenCalled();
  });

  it('Debe cambiar de página y recargar el listado', () => {
    spyOn(component, 'getList');

    component.applyPage(1);
    expect(component.params.filters._page).toEqual(2);
    expect(component.getList).toHaveBeenCalled();

    component.applyPage(3);
    expect(component.params.filters._page).toEqual(4);
    expect(component.getList).toHaveBeenCalled();
  });

  it('Debe cambiar modo de la vista', () => {
    let viewValue = 'table';

    component.applyView(viewValue);

    expect(component.params.view).toEqual(viewValue);

    viewValue = 'table';

    component.applyView(viewValue);

    expect(component.params.view).toEqual(viewValue);
  });

  describe('Botones de acciones', () => {
    it('Debe abrir dialogo de eliminar', () => {
      spyOn(component, 'openDeleteDialog');

      component.actionEvent({ action: 'delete', id: 'dc-batman' });

      expect(component.openDeleteDialog).toHaveBeenCalledWith('dc-batman');
    });

    it('Debe abrir dialogo de Borrado. Cuando cierre que borre el heroe y notifique que ha tenido exito el borrado', () => {
      const id = '1';
      const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed: of(true) });

      spyOn(component, 'getList');

      dialogSpy.open.and.returnValue(dialogRefSpyObj);

      component.openDeleteDialog(id);

      expect(dialogSpy.open).toHaveBeenCalledOnceWith(jasmine.any(Function), {
        width: '500px',
        data: id,
      });

      expect(dialogRefSpyObj.afterClosed).toHaveBeenCalledOnceWith();
      expect(heroesServiceSpy.delete).toHaveBeenCalled();
      expect(notifierServiceSpy.openSuccess).toHaveBeenCalled();

      expect(component.getList).toHaveBeenCalled();
    });
  });
});
