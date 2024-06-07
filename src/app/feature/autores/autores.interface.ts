export interface AutorPage {
  totalElements:    number;
  totalPages:       number;
  size:             number;
  content:          Autor[];
  number:           number;
  sort:             Sort;
  first:            boolean;
  last:             boolean;
  numberOfElements: number;
  pageable:         Pageable;
  empty:            boolean;
}

export interface Autor {
  id:    number;
  autor: string;
}

export interface AutorSave {
  id?:    number;
  autor: string;
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
