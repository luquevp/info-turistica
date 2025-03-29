const mongoose = require('mongoose');

const GastronomiaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  tipo: { type: String }, // Ej: Parrilla, Comida regional, Cafetería, etc.
  descripcion: String,

  especialidades: [String], // Empanadas, Locro, Tamales...

  ubicacion: {
    direccion: String,
    ciudad: String,
    provincia: String,
    coordenadas: {
      lat: Number,
      lng: Number
    }
  },

  horarios: {
    apertura: String,
    cierre: String,
    dias: [String] // Ej: ["Lunes a Domingo"]
  },

  imagenes: [String],
  servicios: [String], // Ej: delivery, mesas afuera, etc.

  contacto: {
    telefono: String,
    email: String,
    sitioWeb: String,
    redesSociales: {
      facebook: String,
      instagram: String
    }
  },

  destacado: { type: Boolean, default: false }

}, { timestamps: true });

module.exports = mongoose.model('Gastronomia', GastronomiaSchema);
