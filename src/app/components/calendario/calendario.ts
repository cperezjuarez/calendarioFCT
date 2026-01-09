import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CalculadoraService } from '../../services/calculadora.service';
import { DiaCalendario, PeriodoPracticas } from '../../models';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-calendario',
  imports: [ReactiveFormsModule, DatePipe, CommonModule],
  templateUrl: './calendario.html',
  styleUrl: './calendario.css',
})
export class Calendario {
  form!: FormGroup;
  yearActual: number = 2026;
  meses: DiaCalendario[][] = []
  periodoPracticas?: PeriodoPracticas;

  constructor(private calculadoraService: CalculadoraService) { }

  ngOnInit(): void {
    this.cargarCalendario();

    this.form = new FormGroup({
      fechaInicio: new FormControl(null, [Validators.required]),
      horasTotales: new FormControl(400, [Validators.required, Validators.min(0)]),
      horasDiarias: new FormControl(8, [Validators.required, Validators.min(0)])
    })

    // Comprobación continua de datos
    this.form.valueChanges.subscribe(() => {
      this.calcularPeriodo();
    })
  }

  cargarCalendario(): void {
    this.meses = this.calculadoraService.generarYearCompleto(this.yearActual);
  }

  getNombreMes(index: number): string {
    return this.calculadoraService.getNombreMes(index);
  }

  calcularPeriodo(): void {
    if (!this.form.invalid) {
      const { horasTotales, horasDiarias, fechaInicio } = this.form.value;

      const diasLaborales = this.calculadoraService.calcularDiasLaborales(horasTotales, horasDiarias);
      const fechaFinal = this.calculadoraService.calcularFechaFinal(fechaInicio, diasLaborales);
      
      this.periodoPracticas = {
        fechaInicial: fechaInicio,
        fechaFinal: fechaFinal,
        horasTotales: horasTotales,
        horasDiarias: horasDiarias,
        diasLaborales: diasLaborales
      }

      this.marcarDiasPracticas(fechaInicio, fechaFinal);
    };
  }

  private marcarDiasPracticas(fechaInicial: string | Date, fechaFinal: string | Date): void {
    // Convertir strings a Date si es necesario
    const inicio = new Date(fechaInicial);
    const fin = new Date(fechaFinal);

    // Normalizar fechas
    inicio.setHours(0, 0, 0, 0);
    fin.setHours(0, 0, 0, 0);

    let mesActual = -1;

    this.meses.forEach(mes => {
      mesActual++;

      mes.forEach(dia => {
        if (dia.estaDentroDelMes) {
          const diaActual = new Date(this.yearActual, mesActual, dia.numero);
          diaActual.setHours(0, 0, 0, 0);
          
          // Verificar si el día está dentro del período de prácticas Y es laborable
          if (diaActual >= inicio && diaActual <= fin && !this.calculadoraService.esDiaLaborable(diaActual)) {
            dia.esDiaPracticas = true;
          } else {
            dia.esDiaPracticas = false;
          }
        }
      });
    });
  }
}
