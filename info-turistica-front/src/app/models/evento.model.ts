// src/app/models/evento.model.ts
import { Categoria } from './categoria.model';

export interface Evento {
  _id: string;
  nombre: string;
  descripcion: string;
  fecha: string;
  hora: string;
  imagenes: string[];
  categoria: Categoria; // 👈 Ya no es string, ahora es objeto
  destacado: boolean;
  entrada: {
    tipo: string;
    precio: string;
  };
  ubicacion: {
    direccion: string;
    ciudad: string;
    provincia: string;
    coordenadas: {
      lat: number;
      lng: number;
    };
  };
  createdAt: string;
  updatedAt: string;
  __v: number;
}
