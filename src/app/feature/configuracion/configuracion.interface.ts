

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





export interface PasswordDTO {
  oldPassword: string;
  newPassword: string;
}
