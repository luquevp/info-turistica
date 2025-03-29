const express = require('express');
const router = express.Router();
const Gastronomia = require('../models/Gastronomia');

// Crear nuevo lugar gastronómico
router.post('/', async (req, res) => {
  try {
    const nuevo = new Gastronomia(req.body);
    const guardado = await nuevo.save();
    res.status(201).json(guardado);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Obtener todos
router.get('/', async (req, res) => {
  try {
    const lista = await Gastronomia.find();
    res.json(lista);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Actualizar
router.put('/:id', async (req, res) => {
  try {
    const actualizado = await Gastronomia.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(actualizado);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Eliminar
router.delete('/:id', async (req, res) => {
  try {
    await Gastronomia.findByIdAndDelete(req.params.id);
    res.json({ mensaje: 'Establecimiento eliminado' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
