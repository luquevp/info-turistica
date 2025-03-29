const mongoose = require('mongoose');

const EventoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: String,

  fecha: Date,
  hora: String,

  lugar: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'LugarTuristico' // Puede estar relacionado con un lugar (opcional)
  },

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

  entrada: {
    tipo: { type: String }, // gratuita, paga
    precio: String // opcional
  },

  categoria: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Categoria',
    required: true
  }, 
  
  destacado: { type: Boolean, default: false }

}, { timestamps: true });

module.exports = mongoose.model('Evento', EventoSchema);
