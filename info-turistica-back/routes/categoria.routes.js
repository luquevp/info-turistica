const express = require('express');
const router = express.Router();
const Categoria = require('../models/Categoria');

// Crear nueva categoría
router.post('/', async (req, res) => {
  try {
    const nuevaCategoria = new Categoria(req.body);
    const categoriaGuardada = await nuevaCategoria.save();
    res.status(201).json(categoriaGuardada);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obtener todas las categorías
router.get('/', async (req, res) => {
  try {
    const categorias = await Categoria.find();
    res.json(categorias);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT - Modificar categoría
router.put('/:id', async (req, res) => {
    try {
      const actualizada = await Categoria.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(actualizada);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  
  // DELETE - Eliminar categoría
  router.delete('/:id', async (req, res) => {
    try {
      await Categoria.findByIdAndDelete(req.params.id);
      res.json({ mensaje: 'Categoría eliminada' });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  
module.exports = router;
