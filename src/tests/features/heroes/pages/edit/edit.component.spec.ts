import { TestBed, ComponentFixture } from '@angular/core/testing';
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
  let compiled: HTMLElement;

  let heroesServiceSpy: jasmine.SpyObj<HeroesService>;
  let notifierServiceSpy: jasmine.SpyObj<NotifierService>;
  let ActivatedRouteSpy: jasmine.SpyObj<ActivatedRoute>;
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
                get: jasmine.createSpy('get').and.returnValue('dc-batman'),
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

    ActivatedRouteSpy = TestBed.inject(
      ActivatedRoute,
    ) as jasmine.SpyObj<ActivatedRoute>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditComponent);
    component = fixture.componentInstance;
    compiled = fixture.debugElement.nativeElement;

    fixture.detectChanges();
  });

  it('Debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('Debe estar desactivado el ID cuando edita heroe', () => {
    const idControl = component.heroForm.get('id');
    expect(idControl?.disabled).toBeTruthy();
  });

  it('Debe habilitar el ID cunado crea heroe', () => {
    ActivatedRouteSpy.snapshot.paramMap.get = () => null;

    fixture = TestBed.createComponent(EditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const idControl = component.heroForm.get('id');
    expect(idControl?.disabled).toBeFalsy();
  });

  it('Debe mostrar el heroe con el nombre en Mayúsculas', () => {
    const superheroInput = fixture.nativeElement.querySelector(
      'input[formControlName="superhero"]',
    );
    superheroInput.value = 'Batman';

    superheroInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.name).toBe('BATMAN');
  });

  it('Debe llamar a Enviar el formulario es valido y enviado', () => {
    spyOn(component, 'onSubmit');

    const form = fixture.nativeElement.querySelector('form');
    form.dispatchEvent(new Event('submit'));

    expect(component.onSubmit).toHaveBeenCalled();
  });

  it('Debe no llamar a Enviar  cuando el formulario es invalido', () => {
    const form = component.heroForm;
    form.patchValue({ superhero: '', alter_ego: '', publisher: '' });
    component.onSubmit();

    expect(heroesServiceSpy.create).not.toHaveBeenCalled();
    expect(heroesServiceSpy.update).not.toHaveBeenCalled();
  });

  it('Debe crear heroe cuando formulario valido', () => {
    const hero: Hero = {
      id: 'dc-superman',
      superhero: 'Superman',
      alter_ego: 'Clark Kent',
      publisher: Publisher.DCComics,
      first_appearance: '',
      characters: '',
      description: '',
    };

    ActivatedRouteSpy.snapshot.paramMap.get = () => null;

    fixture = TestBed.createComponent(EditComponent);
    component = fixture.componentInstance;

    heroesServiceSpy.create.and.returnValue(of(hero));

    component.heroForm.controls['id'].setValue('dc-superman');
    component.heroForm.controls['superhero'].setValue('Superman');
    component.heroForm.controls['alter_ego'].setValue('Clark Kent');
    component.heroForm.controls['publisher'].setValue('DC Comics');

    component.onSubmit();

    expect(heroesServiceSpy.create).toHaveBeenCalledWith(hero);
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('heroes');
    expect(notifierServiceSpy.openSuccess).toHaveBeenCalled();
  });

  it('Debe cargar los datos cuando esta editando', () => {
    const hero: Hero = {
      id: 'dc-superman',
      superhero: 'SUPERMAN',
      alter_ego: 'Clark Kent',
      publisher: Publisher.DCComics,
      first_appearance: 'Action Comics #1',
      characters: 'Superman',
      description: 'The Man of Steel',
    };

    heroesServiceSpy.get.and.returnValue(of(hero));

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.heroForm.getRawValue()).toEqual(hero);
  });

  it('Debe cagar heroe, modificar campo alter_ego y guarda correctamente', () => {
    let hero: Hero = {
      id: 'dc-superman',
      superhero: 'SUPERMAN',
      alter_ego: 'Clark Kent',
      publisher: Publisher.DCComics,
      first_appearance: 'Action Comics #1',
      characters: 'Superman',
      description: 'The Man of Steel',
    };
    heroesServiceSpy.get.and.returnValue(of(hero));
    component.ngOnInit();

    const newAlterEgo = 'Clark Kent (Fake)';
    hero.alter_ego = newAlterEgo;
    component.heroForm.controls['alter_ego'].setValue(newAlterEgo);

    heroesServiceSpy.update.and.returnValue(of(hero));
    component.onSubmit();

    expect(component.heroForm.controls['id'].disabled).toBeTruthy();
    expect(heroesServiceSpy.update).toHaveBeenCalledWith(hero);
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('heroes');
    expect(notifierServiceSpy.openSuccess).toHaveBeenCalled();
  });
});
