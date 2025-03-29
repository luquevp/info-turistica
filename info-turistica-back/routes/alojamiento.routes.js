const express = require('express');
const router = express.Router();
const Alojamiento = require('../models/Alojamiento');

// POST - Crear alojamiento
router.post('/', async (req, res) => {
  try {
    const nuevo = new Alojamiento(req.body);
    const guardado = await nuevo.save();
    res.status(201).json(guardado);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET - Obtener todos los alojamientos
router.get('/', async (req, res) => {
  try {
    const alojamientos = await Alojamiento.find();
    res.json(alojamientos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT - Actualizar alojamiento por ID
router.put('/:id', async (req, res) => {
  try {
    const actualizado = await Alojamiento.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(actualizado);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE - Eliminar alojamiento por ID
router.delete('/:id', async (req, res) => {
  try {
    await Alojamiento.findByIdAndDelete(req.params.id);
    res.json({ mensaje: 'Alojamiento eliminado' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
