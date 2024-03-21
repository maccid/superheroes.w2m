import { DataSource } from 'src/app/core/interfaces/data-source.interface';

export interface Hero extends DataSource {
  superhero: string;
  publisher: Publisher;
  alter_ego: string;
  first_appearance?: string;
  characters?: string;
  description?: string;
}

export enum Publisher {
  DCComics = 'DC Comics',
  MarvelComics = 'Marvel Comics',
  ToeiComics = 'Toei Comics',
}
