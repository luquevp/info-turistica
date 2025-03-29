export interface Coordenadas {
  lat: number;
  lng: number;
}

export interface Ubicacion {
  direccion: string;
  ciudad: string;
  coordenadas: Coordenadas;
}

export interface Categoria {
  _id: string;
  nombre: string;
  descripcion: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Contacto {
  whatsapp: string;
  instagram: string;
  facebook: string;
  email: string;
}

export interface LugarTuristico {
  _id: string;
  nombre: string;
  descripcion: string;
  ubicacion: Ubicacion;
  categoria: Categoria;
  imagenes: string[];
  servicios: string[];
  contacto: Contacto;        // ✅ NUEVO
  destacado: boolean;        // ✅ NUEVO
  estado: boolean;           // ✅ NUEVO
  createdAt: string;
  updatedAt: string;
  __v: number;
}
