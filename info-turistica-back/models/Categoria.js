const mongoose = require('mongoose');

const CategoriaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    unique: true,
  },
  descripcion: String,
  icono: String, // URL opcional para un ícono o imagen
}, {
  timestamps: true
});

module.exports = mongoose.model('Categoria', CategoriaSchema);
