import { Component, signal } from '@angular/core';
import { Calendario } from './components/calendario/calendario';

@Component({
  selector: 'app-root',
  imports: [Calendario],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('calendarioFCT');
}
