import { Component, signal } from '@angular/core';
import { Formulario } from './components/formulario/formulario';
import { Calendario } from './components/calendario/calendario';

@Component({
  selector: 'app-root',
  imports: [Formulario, Calendario],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('calendarioFCT');
}
