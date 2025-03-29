// src/app/services/lugares.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LugarTuristico } from '../models/lugar-turistico.model'; // Importás el modelo

@Injectable({
  providedIn: 'root'
})
export class LugaresService {
  private apiUrl = '/api/lugares';

  constructor(private http: HttpClient) {}

  getLugares(filtros: any = {}): Observable<LugarTuristico[]> {
    let params = new HttpParams();

    Object.keys(filtros).forEach(key => {
      if (filtros[key]) {
        params = params.set(key, filtros[key]);
      }
    });

    return this.http.get<LugarTuristico[]>(this.apiUrl, { params });
  }

  getLugarById(id: string): Observable<LugarTuristico> {
    return this.http.get<LugarTuristico>(`${this.apiUrl}/${id}`);
  }
  
  
}
