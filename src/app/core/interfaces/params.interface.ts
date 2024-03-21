export interface Params {
  filters: Filter;
  view: string;
  count: string;
}

export interface Filter {
  _limit: number;
  _page: number;
  [key: string]: string | number;
}
