import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-image-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.css']
})
export class ImageGalleryComponent implements OnInit, OnDestroy {
  @Input() imagenes: string[] = [];

  imagenActual = 0;
  intervalo!: any;

  ngOnInit(): void {
    if (this.imagenes.length > 1) {
      this.intervalo = setInterval(() => {
        this.imagenActual = (this.imagenActual + 1) % this.imagenes.length;
      }, 5000); // cambia cada 5s
    }
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalo);
  }

  anteriorImagen(): void {
    this.imagenActual =
      (this.imagenActual - 1 + this.imagenes.length) % this.imagenes.length;
  }

  siguienteImagen(): void {
    this.imagenActual =
      (this.imagenActual + 1) % this.imagenes.length;
  }

  seleccionarImagen(index: number): void {
    this.imagenActual = index;
  }
}
