import { Injectable } from '@angular/core';

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
      if (this.esDiaLaborable(fechaActual)) {
        contadorDiasLaborables++;
      }
    }

    return fechaActual;
  }
}
