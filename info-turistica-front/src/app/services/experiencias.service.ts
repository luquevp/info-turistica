import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Experiencia } from '../models/experiencia.model';

@Injectable({ providedIn: 'root' })
export class ExperienciaService {
  private apiUrl = '/api/experiencias';

  constructor(private http: HttpClient) {}

  // Obtener todas las experiencias con filtros
  getExperiencias(filtros: any = {}): Observable<Experiencia[]> {
    const params = new HttpParams({ fromObject: filtros });
    return this.http.get<Experiencia[]>(this.apiUrl, { params });
  }

  // ✅ Obtener una experiencia por ID
  getExperienciaById(id: string): Observable<Experiencia> {
    return this.http.get<Experiencia>(`${this.apiUrl}/${id}`);
  }
}
