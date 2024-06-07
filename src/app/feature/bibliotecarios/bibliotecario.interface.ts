export interface UsuarioPage {
  totalElements:    number;
  totalPages:       number;
  first:            boolean;
  last:             boolean;
  size:             number;
  content:          Usuario[];
  number:           number;
  sort:             Sort;
  numberOfElements: number;
  pageable:         Pageable;
  empty:            boolean;
}

export interface Usuario {
  id:       number;
  username: string;
  persona:  Persona;
}

export interface Persona {
  id?:                  number;
  nombre:              string;
  apellido:            string;
  email:               string;
  telefono:            string;
  direccion:           string;
  fechaNacimiento:     Date;
  ingreso?:             Date;
  expiracionMembresia?: Date;
  rol?:                 Rol;
  genero:              Genero;
  estadoUsuario?:       EstadoUsuario;
  dui:                 string;
}

export interface UsuarioSave {
  id?:       number;
  username: string;
  password: string;
  persona:  Persona;

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

export interface PasswordDTO {
  currentPassword: string;
  newPassword: string;
}
