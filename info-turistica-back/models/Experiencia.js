const mongoose = require('mongoose');

const experienciaSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descripcion: { type: String },
  principalesAtractivos: [{ type: String }],
  imagenes: [{ type: String }],
  duracion: { type: String },
  precio: { type: Number },
  contacto: {
    whatsapp: { type: String },
    instagram: { type: String },
    facebook: { type: String },
    email: { type: String }
  },
  lugar: { type: mongoose.Schema.Types.ObjectId, ref: 'LugarTuristico', required: true }, // ✅ aquí el cambio
  destacado: { type: Boolean, default: false },
  prioridad: { type: Number, default: 0 },
  estado: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Experiencia', experienciaSchema);
