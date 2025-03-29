const mongoose = require('mongoose');

const AlojamientoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  tipo: { type: String }, // hotel, hostal, cabaña, etc.

  descripcion: String,

  ubicacion: {
    direccion: String,
    ciudad: String,
    provincia: String,
    coordenadas: {
      lat: Number,
      lng: Number
    }
  },

  imagenes: [String],
  servicios: [String], // wifi, desayuno, pileta, etc.

  contacto: {
    telefono: String,
    email: String,
    sitioWeb: String,
    redesSociales: {
      facebook: String,
      instagram: String
    }
  },

  precioEstimado: String, // puede ser un texto, ej: "$$", "$$$", o un rango
  destacado: { type: Boolean, default: false }

}, { timestamps: true });

module.exports = mongoose.model('Alojamiento', AlojamientoSchema);
