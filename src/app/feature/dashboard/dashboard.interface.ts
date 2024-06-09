export interface PrestamosDay {
  dia:             Date;
  numeroPrestamos: number;
}

export interface Estadisticas {
  prestamosActivos:             number;
  totalMiembros:                number;
  totalMaterialEducativoActivo: number;
  totalPrestamosRealizados:     number;
}

export interface Historial {
  diaAnterior:  number;
  ultimaSemana: number;
  ultimoMes:    number;
}

