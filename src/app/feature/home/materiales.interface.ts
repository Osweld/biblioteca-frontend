export interface MaterialPage {
  totalPages: number;
  totalElements: number;
  size: number;
  content: Material[];
  number: number;
  sort: Sort;
  first: boolean;
  last: boolean;
  numberOfElements: number;
  pageable: Pageable;
  empty: boolean;
}

export interface MaterialState {
  materialPage: MaterialPage;
  loading: boolean;
}

export interface Material {
  id: number;
  isbm: string;
  titulo: string;
  cantidad: number;
  descripcion: string;
  idioma: Idioma;
  autor: Autor;
  categoria: Categoria;
  estadoMaterial: EstadoMaterial;
  inventario: Inventario;
}

export interface Autor {
  id: number;
  autor: string;
}

export interface Categoria {
  id: number;
  nombre: string;
}

export interface Idioma {
  id: number;
  nombre: string;
}

export interface EstadoMaterial {
  id: number;
  estado: string;
}

export interface Inventario {
  id: number;
  stock: number;
  material: string;
}

export interface Pageable {
  offset: number;
  sort: Sort;
  pageNumber: number;
  pageSize: number;
  unpaged: boolean;
  paged: boolean;
}

export interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}
