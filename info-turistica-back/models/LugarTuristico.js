const mongoose = require('mongoose');

const LugarTuristicoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  descripcion: String,
  ubicacion: {
    direccion: String,
    ciudad: String,
    coordenadas: {
      lat: Number,
      lng: Number
    }
  },
  categoria: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Categoria'
  },
  imagenes: [String],
  servicios: [String],

  // NUEVO: contacto
  contacto: {
    whatsapp: { type: String },
    instagram: { type: String },
    facebook: { type: String },
    email: { type: String }
  },

  // NUEVO: visibilidad
  destacado: { type: Boolean, default: false },
  estado: { type: Boolean, default: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('LugarTuristico', LugarTuristicoSchema);
