export interface MiembrosPage {
  totalPages:       number;
  totalElements:    number;
  size:             number;
  content:         Miembro[];
  number:           number;
  sort:             Sort;
  first:            boolean;
  last:             boolean;
  numberOfElements: number;
  pageable:         Pageable;
  empty:            boolean;
}

export interface Miembro {
  id:                  number;
  nombre:              string;
  apellido:            string;
  email:               string;
  telefono:            string;
  direccion:           string;
  fechaNacimiento:     Date;
  ingreso:             Date;
  expiracionMembresia: Date;
  rol:                 Rol;
  genero:              Genero;
  estadoUsuario:       EstadoUsuario;
  dui:                 string;
}

export interface MiembroSave {
  id?:                  number;
  nombre:              string;
  apellido:            string;
  email:               string;
  telefono:            string;
  direccion:           string;
  fechaNacimiento:     Date;
  rol:                 Rol;
  genero:              Genero;
  dui:                 string;
}

export interface EstadoUsuario {
  id:     number;
  estado: string;
}

export interface Genero {
  id:     number;
  nombre: string;
}

export interface Rol {
  id:  number;
  rol: string;
}

export interface Pageable {
  offset:     number;
  sort:       Sort;
  pageNumber: number;
  pageSize:   number;
  paged:      boolean;
  unpaged:    boolean;
}

export interface Sort {
  empty:    boolean;
  sorted:   boolean;
  unsorted: boolean;
}
