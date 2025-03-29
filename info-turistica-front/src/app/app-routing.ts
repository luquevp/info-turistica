import { Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';

import { LugaresTuristicosComponent } from './pages/lugaresturisticos/lugaresturisticos.component';
import { LugarDetalleComponent } from './pages/lugar-detalle/lugar-detalle.component';

import { EventosComponent } from './pages/eventos/eventos.component';
import { PublicLayoutComponent } from './components/layout/public-layout.component';
import { ExperienciasComponent } from './pages/experiencias/experiencias.component';

export const appRoutes: Routes = [
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      { path: '', component: InicioComponent },
      { path: 'dondeir', component: LugaresTuristicosComponent },
      { path: 'quehacer', component: EventosComponent },
      { path: 'lugar/:id', component: LugarDetalleComponent },
      { path: 'experiencias', component: ExperienciasComponent },
      {
        path: 'experiencias/:id',
        loadComponent: () => import('./pages/experiencia-detalle/experiencia-detalle.component').then(m => m.ExperienciaDetalleComponent)
      }
      

    ]
  }
];
