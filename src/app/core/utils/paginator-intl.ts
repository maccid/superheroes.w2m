import { MatPaginatorIntl } from '@angular/material/paginator';

const getRangeLabel = (page: number, pageSize: number, length: number) => {
  const amountPages = Math.ceil(length / pageSize);
  return `${page + 1} / ${amountPages}`;
};

export const getPaginatorIntl = () => {
  const paginatorIntl = new MatPaginatorIntl();

  paginatorIntl.itemsPerPageLabel = '';
  paginatorIntl.nextPageLabel = '';
  paginatorIntl.previousPageLabel = '';
  paginatorIntl.getRangeLabel = getRangeLabel;

  return paginatorIntl;
};
