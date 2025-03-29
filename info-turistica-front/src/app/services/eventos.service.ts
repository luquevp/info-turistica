// src/app/services/eventos.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Evento } from '../models/evento.model';

@Injectable({
  providedIn: 'root'
})
export class EventosService {
  private apiUrl = '/api/eventos';

  constructor(private http: HttpClient) {}

  getEventos(filtros: any = {}): Observable<Evento[]> {
    let params = new HttpParams();
    Object.keys(filtros).forEach(key => {
      if (filtros[key]) {
        params = params.set(key, filtros[key]);
      }
    });

    return this.http.get<Evento[]>(this.apiUrl, { params });
  }
}
