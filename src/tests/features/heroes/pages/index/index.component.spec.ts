import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { IndexComponent } from 'src/app/features/heroes/pages/index/index.component';
import { HeroesService } from 'src/app/features/heroes/heroes.services';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { Hero, Publisher } from 'src/app/features/heroes/heroes.interface';

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

  //ToDo: Revisar
  it('Debe aplicar filtro de busqueda', () => {
    const heroes: Hero[] = [
      {
        id: 'dc-superman',
        superhero: 'Superman',
        publisher: Publisher.DCComics,
        alter_ego: 'Kal-E',
      },
      {
        id: 'marvel-spider',
        superhero: 'Spider Man',
        publisher: Publisher.MarvelComics,
        alter_ego: 'Peter Parker',
      },
    ];

    heroesServiceSpy.list.and.returnValue(of(heroes));

    component.applyFilter('Super');

    expect(heroesServiceSpy.list).toHaveBeenCalledWith('?superhero_like=Super');
    expect(component.dataSource()).toEqual(heroes);
  });

  it('Debe cambiar modo de la vista', () => {
    const viewValue = 'table';

    component.applyView(viewValue);

    expect(component.view.mode).toEqual(viewValue);
  });

  it('Debe abrir dialogo de Borrado. Cuando cierre que borre el heroe y notifique que ha tenido exito el borrado', () => {
    const id = '1';
    const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed: of(true) });
    dialogSpy.open.and.returnValue(dialogRefSpyObj);

    component.openDeleteDialog(id);

    expect(dialogSpy.open).toHaveBeenCalledOnceWith(jasmine.any(Function), {
      width: '400px',
      data: id,
    });

    expect(dialogRefSpyObj.afterClosed).toHaveBeenCalled();
    expect(heroesServiceSpy.delete).toHaveBeenCalled();
    expect(notifierServiceSpy.openSuccess).toHaveBeenCalled();
  });
});
