import {
  TestBed,
  ComponentFixture,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { EditComponent } from 'src/app/features/heroes/pages/edit/edit.component';
import { HeroesService } from 'src/app/features/heroes/heroes.services';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { Hero, Publisher } from 'src/app/features/heroes/heroes.interface';

describe('EditComponent', () => {
  let component: EditComponent;
  let fixture: ComponentFixture<EditComponent>;

  let heroesServiceSpy: jasmine.SpyObj<HeroesService>;
  let notifierServiceSpy: jasmine.SpyObj<NotifierService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        NoopAnimationsModule,
        EditComponent,
      ],
      providers: [
        {
          provide: HeroesService,
          useValue: jasmine.createSpyObj('HeroesService', {
            get: of([]),
            update: of([]),
            create: of([]),
          }),
        },
        {
          provide: NotifierService,
          useValue: jasmine.createSpyObj('NotifierService', ['openSuccess']),
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: jasmine.createSpy('get').and.returnValue('1'),
              },
            },
          },
        },
        {
          provide: Router,
          useValue: jasmine.createSpyObj('Router', ['navigateByUrl']),
        },
      ],
    }).compileComponents();

    heroesServiceSpy = TestBed.inject(
      HeroesService,
    ) as jasmine.SpyObj<HeroesService>;

    notifierServiceSpy = TestBed.inject(
      NotifierService,
    ) as jasmine.SpyObj<NotifierService>;

    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('Debe crear el componente', () => {
    expect(component).toBeTruthy();
  });
/*
  it('should initialize with hero data when id is provided', fakeAsync(() => {
    const hero: Hero = {
      id: 'dc-superman',
      superhero: 'Superman',
      alter_ego: 'Clark Kent',
      publisher: Publisher.DCComics,
      first_appearance: 'Action Comics #1',
      characters: 'Superman',
      description: 'The Man of Steel',
    };

    heroesServiceSpy.get.and.returnValue(of(hero));

    fixture.detectChanges();
    tick();

    console.log(hero);
    expect(component.heroForm.value).toEqual(hero);
  }));*/
  /*
  it('should disable id field and call update when id is provided and form is submitted', fakeAsync(() => {
    const hero : Hero = {
      id: '1',
      superhero: 'Superman',
      alter_ego: 'Clark Kent',
      publisher: Publisher.DCComics,
      first_appearance: 'Action Comics #1',
      characters: 'Superman',
      description: 'The Man of Steel',
    };
    heroesServiceSpy.get.and.returnValue(of(hero));
    heroesServiceSpy.update.and.returnValue(of<Hero>({}));

    fixture.detectChanges();
    tick();

    component.onSubmit();
    tick();

    expect(component.heroForm.controls['id'].disabled).toBeTruthy();
    expect(heroesServiceSpy.update).toHaveBeenCalledWith(hero);
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('heroes');
    expect(notifierServiceSpy.openSuccess).toHaveBeenCalled();
  }));

  it('should call create when id is not provided and form is submitted', fakeAsync(() => {
    const hero = {
      id: '',
      superhero: 'Superman',
      alter_ego: 'Clark Kent',
      publisher: Publisher.DCComics,
      first_appearance: 'Action Comics #1',
      characters: 'Superman',
      description: 'The Man of Steel',
    };
    heroesServiceSpy.create.and.returnValue(of({}));

    fixture.detectChanges();
    tick();

    component.onSubmit();
    tick();

    expect(heroesServiceSpy.create).toHaveBeenCalledWith(hero);
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('heroes');
    expect(notifierServiceSpy.openSuccess).toHaveBeenCalled();
  }));*/
  
});
