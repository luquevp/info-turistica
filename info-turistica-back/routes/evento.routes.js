const express = require('express');
const router = express.Router();
const Evento = require('../models/Evento');

// Crear evento
router.post('/', async (req, res) => {
  try {
    const nuevo = new Evento(req.body);
    const guardado = await nuevo.save();
    res.status(201).json(guardado);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Obtener todos con filtros dinámicos
router.get('/', async (req, res) => {
  try {
    const filtro = {};

    // Filtro por categoría (ObjectId)
    if (req.query.categoria) {
      filtro.categoria = req.query.categoria;
    }

    // Filtro por texto en nombre o descripción
    if (req.query.q) {
      const regex = new RegExp(req.query.q, 'i');
      filtro.$or = [
        { nombre: regex },
        { descripcion: regex }
      ];
    }

    // Filtro por destacado (true/false)
    if (req.query.destacado === 'true' || req.query.destacado === 'false') {
      filtro.destacado = req.query.destacado === 'true';
    }

    const lista = await Evento.find(filtro)
      .populate('categoria') // ✅ para mostrar nombre y descripción de la categoría
      .populate('lugar');    // opcional, si el evento tiene relación con un lugar turístico

    res.json(lista);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Actualizar evento
router.put('/:id', async (req, res) => {
  try {
    const actualizado = await Evento.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(actualizado);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Eliminar evento
router.delete('/:id', async (req, res) => {
  try {
    await Evento.findByIdAndDelete(req.params.id);
    res.json({ mensaje: 'Evento eliminado' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
