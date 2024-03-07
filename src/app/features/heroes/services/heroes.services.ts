import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@env/environment';
import { Hero } from '../interfaces/heroes.interface';

@Injectable({ providedIn: 'root' })
export class HeroesService {

  private url: string;

  constructor(private http: HttpClient) { 
    this.url = environment.apiUrl;
    console.log(`${this.url}/heroes`)
  }

  getHeroes(params?: HttpParams): Observable<Hero[]> {
    
    const options = { params };

    //Params
    //return this.http.get<Heroe[]>(`${URL}/heroes?superhero_like=${texto}`);
    //return this.http.get<Heroe[]>(`${URL}/heroes?_page=${this.page}&_limit=${this.limit}`);

    return this.http.get<Hero[]>(`${this.url}/heroes`, options);
  
  }

  getHero(id: string): Observable<Hero>{

    return this.http.get<Hero>(`${this.url}/heroes/${id}`);
  }


  createHero(heroe:Hero):Observable<Hero>{

    return this.http.post<Hero>(`${this.url}/heroes`,heroe);

  }

  updateHero(heroe:Hero):Observable<Hero>{

    return this.http.put<Hero>(`${this.url}/heroes/${heroe.id}`,heroe);

  }

  deleteHero(id:string):Observable<Hero>{

    return this.http.delete<Hero>(`${this.url}/heroes/${id}`);

  }

}
