import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { Hero } from '../models/heroes.interface';

@Injectable({ providedIn: 'root' })
export class HeroesService {
  private url: string;

  constructor(private http: HttpClient) {
    this.url = environment.apiUrl;
  }

  list(params: string = ''): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.url}/heroes${params}`);
  }

  get(id: string): Observable<Hero> {
    return this.http.get<Hero>(`${this.url}/heroes/${id}`);
  }

  create(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(`${this.url}/heroes`, hero);
  }

  update(hero: Hero): Observable<Hero> {
    return this.http.put<Hero>(`${this.url}/heroes/${hero.id}`, hero);
  }

  delete(id: string): Observable<Hero> {
    return this.http.delete<Hero>(`${this.url}/heroes/${id}`);
  }
}
