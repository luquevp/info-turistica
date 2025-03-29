import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { LugarTuristico } from '../../models/lugar-turistico.model';
import { LugaresService } from '../../services/lugaresturisticos.service';
import { Experiencia } from '../../models/experiencia.model';
import { ExperienciaService } from '../../services/experiencias.service';

import { ImageGalleryComponent } from '../../components/shared/image-gallery/image-gallery.component';
import { BreadcrumbComponent } from '../../components/shared/breadcrumb/breadcrumb.component';
import { CarruselSlideComponent } from '../../components/shared/carrusel-slide/carrusel-slide.component';

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
  selector: 'app-lugar-detalle',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ImageGalleryComponent,
    
    CarruselSlideComponent,
  ],
  templateUrl: './lugar-detalle.component.html',
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
export class LugarDetalleComponent implements OnInit, OnDestroy {
  lugar!: LugarTuristico;
  mapUrl!: SafeResourceUrl;
  experiencias: Experiencia[] = [];

  constructor(
    private route: ActivatedRoute,
    private lugaresService: LugaresService,
    private experienciaService: ExperienciaService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.lugaresService.getLugarById(id).subscribe({
        next: (res) => {
          this.lugar = res;

          // 🌟 Cargar experiencias asociadas a este lugar
          if (res._id && typeof res._id === 'string') {
            this.experienciaService.getExperiencias({ lugar: res._id }).subscribe({
              next: (data) => {
                this.experiencias = data.filter(e => e.estado);
              },
              error: (err) => {
                console.error('❌ Error al obtener experiencias relacionadas:', err);
              }
            });
          }
          

          // 🗺 Mapa
          const coords = res.ubicacion?.coordenadas;
          if (coords) {
            const unsafeUrl = `https://www.google.com/maps?q=${coords.lat},${coords.lng}&output=embed`;
            this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(unsafeUrl);
          }
        },
        error: (err) => {
          console.error('❌ Error al cargar el lugar:', err);
        }
      });
    }
  }

  ngOnDestroy(): void {
    // Dejar por buenas prácticas si luego agregás subscripciones manuales
  }
}
