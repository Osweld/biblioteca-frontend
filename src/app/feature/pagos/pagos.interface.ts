export interface PagoPage {
  content:          Pago[];
  pageable:         Pageable;
  last:             boolean;
  totalElements:    number;
  totalPages:       number;
  size:             number;
  number:           number;
  sort:             Sort;
  first:            boolean;
  numberOfElements: number;
  empty:            boolean;
}

export interface Pago {
  id:        number;
  monto:     number;
  fechaPago: Date;
  persona:   Persona;
  tipoPago:  TipoPago;
}

export interface Persona {
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

export interface TipoPago {
  id:   number;
  tipo: string;
}

export interface Pageable {
  pageNumber: number;
  pageSize:   number;
  sort:       Sort;
  offset:     number;
  unpaged:    boolean;
  paged:      boolean;
}

export interface Sort {
  empty:    boolean;
  sorted:   boolean;
  unsorted: boolean;
}
