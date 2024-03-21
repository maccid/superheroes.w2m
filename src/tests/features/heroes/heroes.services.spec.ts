import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { environment } from '@env/environment';

import { HeroesService } from 'src/app/features/heroes/services/heroes.services';
import {
  Hero,
  Publisher,
} from 'src/app/features/heroes/models/heroes.interface';

describe('HeroesService', () => {
  let service: HeroesService;
  let httpMock: HttpTestingController;
  let url: string;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
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

  it('Debe mostrar listado de heroes', (done) => {
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

    const params = new HttpParams();

    service.list(params).subscribe((response: HttpResponse<Hero[]>) => {
      const heroes = response.body || [];
      expect(heroes.length).toBe(2);
      expect(heroes).toEqual(mockHeroes);
      done();
    });

    const req = httpMock.expectOne(`${url}/heroes`);
    expect(req.request.method).toBe('GET');
    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');
    req.flush(mockHeroes);

    httpMock.verify();
  });

  it('Debe obtener un heroe por id', (done) => {
    const id = 'dc-superman';
    const mockHero: Hero = {
      id: 'dc-superman',
      superhero: 'Superman',
      publisher: Publisher.DCComics,
      alter_ego: 'Kal-E',
    };

    service.get(id).subscribe((hero: Hero) => {
      expect(hero).toEqual(mockHero);
      done();
    });

    const req = httpMock.expectOne(`${url}/heroes/${id}`);
    expect(req.request.method).toBe('GET');
    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');
    req.flush(mockHero);
  });

  it('Debe crear un nuevo heroe', (done) => {
    const newHero: Hero = {
      id: 'marvel-ironman',
      superhero: 'Iron Man',
      publisher: Publisher.MarvelComics,
      alter_ego: 'Tony Stark',
    };

    service.create(newHero).subscribe((hero) => {
      expect(hero.superhero).toEqual(newHero.superhero);
      expect(hero.publisher).toEqual(newHero.publisher);
      done();
    });

    const req = httpMock.expectOne(`${url}/heroes`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toBe(newHero);
    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');
    req.flush(newHero);
  });

  it('Debe actualizar heroe mediante id', (done) => {
    const updatedHero: Hero = {
      id: 'dc-batman',
      superhero: 'Batman1',
      publisher: Publisher.DCComics,
      alter_ego: 'Bruce Wayne',
    };

    service.update(updatedHero).subscribe((hero) => {
      expect(hero).toEqual(updatedHero);
      done();
    });

    const req = httpMock.expectOne(`${url}/heroes/${updatedHero.id}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toBe(updatedHero);
    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');
    req.flush(updatedHero);
  });

  it('Debe borrar heroe mediante id', (done) => {
    const heroId = 'dc-batman';

    service.delete(heroId).subscribe(() => {
      expect().nothing();
      done();
    });

    const req = httpMock.expectOne(`${url}/heroes/${heroId}`);
    expect(req.request.method).toBe('DELETE');
    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');
    req.flush({});
  });
});
