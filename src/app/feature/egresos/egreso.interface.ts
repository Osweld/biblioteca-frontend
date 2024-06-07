export interface EgresoPage {
  totalElements:    number;
  totalPages:       number;
  size:             number;
  content:          Egreso[];
  number:           number;
  sort:             Sort;
  first:            boolean;
  last:             boolean;
  numberOfElements: number;
  pageable:         Pageable;
  empty:            boolean;
}

export interface Egreso {
  id?:         number;
  monto:      number;
  fechaPago?:  Date;
  tipoEgreso: TipoEgreso;
}

export interface TipoEgreso {
  id:   number;
  tipo: string;
}

export interface Pageable {
  offset:     number;
  sort:       Sort;
  pageSize:   number;
  pageNumber: number;
  unpaged:    boolean;
  paged:      boolean;
}

export interface Sort {
  empty:    boolean;
  sorted:   boolean;
  unsorted: boolean;
}
