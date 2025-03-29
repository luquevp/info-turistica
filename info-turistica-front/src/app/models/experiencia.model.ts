import { LugarTuristico } from './lugar-turistico.model';

export interface Experiencia {
  _id?: string;
  titulo: string;
  descripcion: string;
  principalesAtractivos: string[];
  imagenes: string[];
  duracion?: string;
  precio?: number;

  contacto: {
    whatsapp?: string;
    instagram?: string;
    facebook?: string;
    email?: string;
  };

  lugar: LugarTuristico; // ✅ Ya no es | string
  destacado: boolean;
  prioridad: number;
  estado: boolean;
  createdAt?: string;
}
