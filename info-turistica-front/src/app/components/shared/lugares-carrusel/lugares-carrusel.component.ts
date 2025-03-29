import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LugaresService } from '../../../services/lugaresturisticos.service';
import { LugarTuristico } from '../../../models/lugar-turistico.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-lugares-carrusel',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './lugares-carrusel.component.html',
  styleUrls: ['./lugares-carrusel.component.css'],
})
export class LugaresCarruselComponent implements OnInit {
  lugares: LugarTuristico[] = [];

  @ViewChild('carrusel', { static: false }) carruselRef!: ElementRef<HTMLDivElement>;

  constructor(private lugaresService: LugaresService) {}

  ngOnInit(): void {
    this.lugaresService.getLugares().subscribe({
      next: (res) => (this.lugares = res),
      error: (err) => console.error('Error cargando lugares', err),
    });
  }

  scrollLeft(): void {
    this.carruselRef.nativeElement.scrollBy({ left: -300, behavior: 'smooth' });
  }

  scrollRight(): void {
    this.carruselRef.nativeElement.scrollBy({ left: 300, behavior: 'smooth' });
  }
}
