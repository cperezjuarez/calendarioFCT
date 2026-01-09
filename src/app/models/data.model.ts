export interface PeriodoPracticas {
  fechaInicial: Date;
  fechaFinal: Date;
  horasTotales: number;
  horasDiarias: number;
  diasLaborales: number;
}

export interface DiaCalendario {
  fecha: Date;
  numero: number;
  estaDentroDelMes: boolean;
  esFinDeSemana: boolean;
  esFestivo: boolean;
  esDiaPracticas: boolean;
}