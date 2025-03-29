const express = require('express');
const router = express.Router();
const Lugar = require('../models/LugarTuristico');

// Crear nuevo lugar
router.post('/', async (req, res) => {
  try {
    const nuevoLugar = new Lugar(req.body);
    const lugarGuardado = await nuevoLugar.save();
    res.status(201).json(lugarGuardado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obtener todos los lugares (con filtros opcionales)
router.get('/', async (req, res) => {
  try {
    const filtro = { estado: true }; // Filtrar solo lugares activos

    // Filtros de categoría
    if (req.query.categoria) {
      filtro.categoria = req.query.categoria;
    }

    // Filtro por si es destacado
    if (req.query.destacado !== undefined) {
      filtro.destacado = req.query.destacado === 'true';
    }

    // Filtro por nombre o descripción (búsqueda de texto)
    if (req.query.q) {
      filtro.$or = [
        { nombre: { $regex: req.query.q, $options: 'i' } },
        { descripcion: { $regex: req.query.q, $options: 'i' } }
      ];
    }

    const lugares = await Lugar.find(filtro).populate('categoria');
    res.json(lugares);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener un solo lugar por ID
router.get('/:id', async (req, res) => {
  try {
    const lugar = await Lugar.findById(req.params.id).populate('categoria');
    if (!lugar) {
      return res.status(404).json({ mensaje: 'Lugar no encontrado' });
    }
    res.json(lugar);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar lugar
router.put('/:id', async (req, res) => {
  try {
    const actualizado = await Lugar.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(actualizado);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Eliminar lugar
router.delete('/:id', async (req, res) => {
  try {
    await Lugar.findByIdAndDelete(req.params.id);
    res.json({ mensaje: 'Lugar eliminado' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
