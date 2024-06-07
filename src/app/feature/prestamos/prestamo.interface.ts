export interface PrestamoPage {
  totalElements:    number;
  totalPages:       number;
  first:            boolean;
  last:             boolean;
  size:             number;
  content:          Prestamo[];
  number:           number;
  sort:             Sort;
  numberOfElements: number;
  pageable:         Pageable;
  empty:            boolean;
}

export interface Prestamo {
  id:             number;
  fechaInicio:    Date;
  fechaEntrega:   Date;
  miembro:        Persona;
  bibliotecario:  Persona;
  material:       Material;
  estadoPrestamo: Estado;
}

export interface PrestamoSave {
  miembro:        Persona;
  bibliotecario:  Persona;
  material:       Material;
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
  estadoUsuario:       Estado;
  dui:                 string;
}

export interface Estado {
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

export interface Material {
  id:             number;
  isbn:           string;
  titulo:         string;
  cantidad:       number;
  descripcion:    string;
  idioma:         Genero;
  autor:          Autor;
  categoria:      Genero;
  estadoMaterial: Estado;
  inventario:     Inventario;
}

export interface Autor {
  id:    number;
  autor: string;
}

export interface Inventario {
  id:       number;
  stock:    number;
  material: string;
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
