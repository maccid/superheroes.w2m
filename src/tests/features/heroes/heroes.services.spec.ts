import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { environment } from '@env/environment';

import { HeroesService } from 'src/app/features/heroes/heroes.services';
import { Hero, Publisher } from 'src/app/features/heroes/heroes.interface';

describe('HeroesService', () => {
  let service: HeroesService;
  let httpMock: HttpTestingController;
  let url: string;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HeroesService],
    });
    service = TestBed.inject(HeroesService);
    httpMock = TestBed.inject(HttpTestingController);
    url = environment.apiUrl;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('Debe crear el servicio', () => {
    expect(service).toBeTruthy();
  });
  //ToDo: Revisar
  it('Debe mostrar listado de heroes', () => {
    const mockHeroes: Hero[] = [
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

    service.list().subscribe((heroes: Hero[]) => {
      expect(heroes.length).toBe(2);
      expect(heroes).toEqual(mockHeroes);
    });

    const req = httpMock.expectOne(`${url}/heroes`);
    expect(req.request.method).toBe('GET');
    req.flush(mockHeroes);
  });

  it('Debe obtener un heroe por id', () => {
    const id = 'dc-superman';
    const mockHero: Hero = {
      id: 'dc-superman',
      superhero: 'Superman',
      publisher: Publisher.DCComics,
      alter_ego: 'Kal-E',
    };

    service.get(id).subscribe((hero: Hero) => {
      expect(hero).toEqual(mockHero);
    });

    const req = httpMock.expectOne(`${url}/heroes/${id}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockHero);
  });

  it('Debe crear un nuevo heroe', () => {
    const newHero: Hero = {
      id: 'marvel-ironman',
      superhero: 'Iron Man',
      publisher: Publisher.MarvelComics,
      alter_ego: 'Tony Stark',
    };

    service.create(newHero).subscribe((hero) => {
      expect(hero.superhero).toEqual(newHero.superhero);
      expect(hero.publisher).toEqual(newHero.publisher);
    });

    const req = httpMock.expectOne(`${url}/heroes`);
    expect(req.request.method).toBe('POST');
    req.flush(newHero);
  });

  it('Debe actualizar heroe mediante id', () => {
    const updatedHero: Hero = {
      id: 'dc-batman',
      superhero: 'Batman1',
      publisher: Publisher.DCComics,
      alter_ego: 'Bruce Wayne',
    };

    service.update(updatedHero).subscribe((hero) => {
      expect(hero).toEqual(updatedHero);
    });

    const req = httpMock.expectOne(`${url}/heroes/${updatedHero.id}`);
    expect(req.request.method).toBe('PUT');
    req.flush(updatedHero);
  });

  it('Debe borrar heroe mediante id', () => {
    const heroId = 'dc-batman';

    service.delete(heroId).subscribe(() => {
      expect().nothing();
    });

    const req = httpMock.expectOne(`${url}/heroes/${heroId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });
});
