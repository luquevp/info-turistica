import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { LugaresService } from '../../services/lugaresturisticos.service';
import { CategoriasService } from '../../services/categorias.service';
import { LugarTuristico } from '../../models/lugar-turistico.model';
import { Categoria } from '../../models/categoria.model';
import { LoadingSpinnerComponent } from '../../components/shared/loading-spinner/loading-spinner.component';

import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger
} from '@angular/animations';
import { BreadcrumbComponent } from "../../components/shared/breadcrumb/breadcrumb.component";

@Component({
  selector: 'app-lugaresturisticos',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    LoadingSpinnerComponent,
],
  templateUrl: './lugaresturisticos.component.html',
  animations: [
    trigger('fadeInStagger', [
      transition(':enter', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(15px)' }),
          stagger(100, [
            animate('400ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class LugaresTuristicosComponent implements OnInit {
  lugaresDestacados: LugarTuristico[] = [];
  lugaresRestantes: LugarTuristico[] = [];
  categorias: Categoria[] = [];

  categoriaSeleccionada: string = '';
  cargando: boolean = false;
  isOpen: boolean = false;

  constructor(
    private lugaresService: LugaresService,
    private categoriasService: CategoriasService
  ) {}

  ngOnInit(): void {
    this.categoriasService.getCategorias().subscribe((cats) => {
      this.categorias = cats;
    });

    this.getLugares();
  }

  getLugares(): void {
    this.cargando = true;
    const filtros: any = {};

    if (this.categoriaSeleccionada) {
      filtros.categoria = this.categoriaSeleccionada;
    }

    this.lugaresService.getLugares(filtros).subscribe({
      next: (data) => {
        this.lugaresDestacados = data.filter(l => l.destacado);
        this.lugaresRestantes = data.filter(l => !l.destacado);
        this.cargando = false;
      },
      error: () => {
        this.cargando = false;
      }
    });
  }

  toggleDropdown(): void {
    this.isOpen = !this.isOpen;
  }

  selectCategoria(id: string): void {
    this.categoriaSeleccionada = id;
    this.getLugares();
    this.isOpen = false;
  }

  getCategoriaNombreSeleccionada(): string | undefined {
    return this.categorias.find(c => c._id === this.categoriaSeleccionada)?.nombre;
  }
}
