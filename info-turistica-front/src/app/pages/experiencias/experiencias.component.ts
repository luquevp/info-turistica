import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Experiencia } from '../../models/experiencia.model';
import { RouterModule } from '@angular/router';

import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger
} from '@angular/animations';
import { ExperienciaService } from '../../services/experiencias.service';


@Component({
  selector: 'app-experiencias',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './experiencias.component.html',
  styleUrls: ['./experiencias.component.css'],
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('fadeInStagger', [
      transition(':enter', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger(100, [
            animate('400ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})

export class ExperienciasComponent implements OnInit {
  experienciasDestacadas: Experiencia[] = [];
  experienciasRestantes: Experiencia[] = [];
  loading = true;

  constructor(private experienciasService: ExperienciaService) {}

  ngOnInit(): void {
    this.experienciasService.getExperiencias().subscribe({
      next: (experiencias: Experiencia[]) => {
        const activas = experiencias.filter(e => e.estado);

        this.experienciasDestacadas = activas
          .filter(e => e.destacado)
          .sort((a, b) => b.prioridad - a.prioridad);

        this.experienciasRestantes = activas
          .filter(e => !e.destacado)
          .sort((a, b) => b.prioridad - a.prioridad);

        this.loading = false;
      },
      error: (err) => {
        console.error('Error al obtener experiencias:', err);
        this.loading = false;
      }
    });
  }
}
