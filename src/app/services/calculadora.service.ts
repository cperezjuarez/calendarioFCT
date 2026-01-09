import { Injectable } from '@angular/core';
import { DiaCalendario } from '../models';

@Injectable({
  providedIn: 'root',
})
export class CalculadoraService {
  readonly DIAS_NO_LECTIVOS: string[] = [
    '2025-12-08',
    '2025-12-22',
    '2025-12-23',
    '2025-12-24',
    '2025-12-25',
    '2025-12-26',
    '2025-12-27',
    '2025-12-28',
    '2025-12-29',
    '2025-12-30',
    '2025-12-31',
    '2026-01-01',
    '2026-01-02',
    '2026-01-05',
    '2026-01-06',
    '2026-01-20',
    '2026-02-27',
    '2026-03-02',
    '2026-03-03',
    '2026-04-02',
    '2026-04-03',
    '2026-04-06',
    '2026-04-07',
    '2026-04-08',
    '2026-04-09',
    '2026-04-10',
    '2026-05-01',
    '2026-05-04'
  ];

  // Genera el calendario de 1 año
  generarYearCompleto(year: number): DiaCalendario[][] {
    const meses:  DiaCalendario[][] = [];
    
    for (let mes = 0; mes < 12; mes++) {
      meses.push(this.generarDiasMes(year, mes));
    }
    
    return meses;
  }

  // Generar los diasa del mes
  private generarDiasMes(year: number, mes: number): DiaCalendario[] {
    const dias: DiaCalendario[] = [];
    
    // Primer dia del mes
    const primerDia = new Date(year, mes, 1);
    const primerDiaSemana = primerDia.getDay();
    
    // Último dia del mes
    const ultimoDia = new Date(year, mes + 1, 0);
    const diasDelMes = ultimoDia.getDate();
    
    // Añadir dias vacios al principio
    const diasVaciosAlInicio = primerDiaSemana === 0 ? 6 : primerDiaSemana - 1;
    for (let i = diasVaciosAlInicio; i > 0; i--) {
      const fecha = new Date(year, mes, 1 - i);
      dias.push(this.crearDiaCalendario(fecha, false));
    }
    
    // Añadir todos los dias del mes
    for (let dia = 1; dia <= diasDelMes; dia++) {
      const fecha = new Date(year, mes, dia);
      dias.push(this.crearDiaCalendario(fecha, true));
    }
    
    // Completar la última semana con los días vacios de la siguiente
    const diasTotales = dias.length;
    const DiasFinalesVacios = diasTotales % 7 === 0 ? 0 : 7 - (diasTotales % 7);
    for (let i = 1; i <= DiasFinalesVacios; i++) {
      const fecha = new Date(year, mes + 1, i);
      dias.push(this.crearDiaCalendario(fecha, false));
    }
    
    return dias;
  }

  // Crear un objeto DiaCalendario a partir de una fecha
  private crearDiaCalendario(fecha: Date, estaDentroDelMes: boolean): DiaCalendario {
    return {
      fecha: fecha,
      numero: fecha.getDate(),
      estaDentroDelMes: estaDentroDelMes,
      esFinDeSemana: this.esFinDeSemana(fecha),
      esFestivo: this.esFestivo(fecha),
      esDiaPracticas: false,
    };
  }

  // Devuelve el nombre del mes
  getNombreMes(index: number): string {
    const nombres = [
      'Enero', 'Febrero', 'Marzo', 'Junio', 'Julio', 
      'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ]

    return nombres[index]
  }

  // Comprobar si es fin de semana
  esFinDeSemana(fecha: Date): boolean {
    const dia = fecha.getDay();
    return dia === 0 || dia === 6; // 0 = Domingo, 6 = Sábado
  }

  // Comprobar si un dia es festivo
  esFestivo(fecha: Date): boolean {
    const fechaString = fecha.toISOString().split('T')[0]; // Formato YYYY-MM-DD
    return this.DIAS_NO_LECTIVOS.includes(fechaString);
  }

  // Comprobar si es un dia laborable (no es fin de semana ni festivo)
  esDiaLaborable(fecha: Date): boolean {
    return this.esFinDeSemana(fecha) || this.esFestivo(fecha);
  }

  // Devuelve los dias laborables totales de las practicas
  calcularDiasLaborales(horasTotales: number, horasDiarias: number): number {
    return Math.ceil(horasTotales / horasDiarias);
  }

  // Calcular la fecha final de las practicas
  calcularFechaFinal(fechaInicial: Date, diasLaborablesNecesarios: number): Date {
    let fechaActual = new Date(fechaInicial);
    let contadorDiasLaborables = 0;

    while (contadorDiasLaborables < diasLaborablesNecesarios) {
      // Avanzamos un día
      fechaActual.setDate(fechaActual.getDate() + 1);

      // Si es laborable, incrementamos el contador
      if (!this.esDiaLaborable(fechaActual)) {
        contadorDiasLaborables++;
      }
    }

    return fechaActual;
  }
}
