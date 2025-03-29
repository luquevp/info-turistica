import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LugaresCarruselComponent } from '../../components/shared/lugares-carrusel/lugares-carrusel.component';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule,
    LugaresCarruselComponent],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {

}
