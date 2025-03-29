import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EventosService } from '../../services/eventos.service';
import { Evento } from '../../models/evento.model';
import { CategoriasService } from '../../services/categorias.service';
import { Categoria } from '../../models/categoria.model';
import { LoadingSpinnerComponent } from '../../components/shared/loading-spinner/loading-spinner.component';
import { BreadcrumbComponent } from '../../components/shared/breadcrumb/breadcrumb.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-eventos',
  standalone: true,
  imports: [CommonModule, FormsModule, LoadingSpinnerComponent,RouterModule, ],
  templateUrl: './eventos.component.html',
})
export class EventosComponent implements OnInit {
  eventos: Evento[] = [];
  categorias: Categoria[] = [];
  categoriaSeleccionada: string = '';
  cargando: boolean = false;

  constructor(
    private eventosService: EventosService,
    private categoriasService: CategoriasService
  ) {}

  ngOnInit(): void {
    this.categoriasService.getCategorias().subscribe((cats: Categoria[]) => {
      this.categorias = cats;
    });

    this.getEventos();
  }

  getEventos(): void {
    this.cargando = true;
  
    const filtros: any = {};
    if (this.categoriaSeleccionada) {
      filtros.categoria = this.categoriaSeleccionada;
    }
  
    this.eventosService.getEventos(filtros).subscribe({
      next: (data: Evento[]) => {
        this.eventos = data.sort(
          (a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime()
        );
        this.cargando = false;
      },
      error: () => {
        this.cargando = false;
      }
    });
  }
  

  onCategoriaChange(): void {
    this.getEventos();
  }
}
