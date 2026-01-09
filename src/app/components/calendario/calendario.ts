import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-calendario',
  imports: [ReactiveFormsModule],
  templateUrl: './calendario.html',
  styleUrl: './calendario.css',
})
export class Calendario {
form!: FormGroup;

  

  ngOnInit(): void {
    this.form = new FormGroup({
      fechaInicio: new FormControl(null, [Validators.required]),
      horasTotales: new FormControl(400, [Validators.required, Validators.min(0)]),
      horasDiarias: new FormControl(8, [Validators.required, Validators.min(0)])
    })
  }

  calcular() {
    
  }
}
