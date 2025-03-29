import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { ExperienciaService } from '../../services/experiencias.service';
import { Experiencia } from '../../models/experiencia.model';

import { BreadcrumbComponent } from '../../components/shared/breadcrumb/breadcrumb.component';
import { ImageGalleryComponent } from '../../components/shared/image-gallery/image-gallery.component';
import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger,
  animateChild
} from '@angular/animations';


@Component({
  selector: 'app-experiencia-detalle',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ImageGalleryComponent,
  ],
  templateUrl: './experiencia-detalle.component.html',
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('fadeInStagger', [
      transition(':enter', [
        query('@fadeInUp', [
          stagger(150, animateChild())
        ], { optional: true })
      ])
    ])
  ],
})
export class ExperienciaDetalleComponent implements OnInit {
  experiencia!: Experiencia;

  constructor(
    private route: ActivatedRoute,
    private experienciaService: ExperienciaService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.experienciaService.getExperienciaById(id).subscribe({
        next: (data) => this.experiencia = data,
        error: (err) => console.error('❌ Error al cargar experiencia:', err)
      });
    }
  }
}
