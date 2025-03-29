const express = require('express');
const mongoose = require('mongoose');
const Experiencia = require('../models/Experiencia');

const router = express.Router();

// Crear una nueva experiencia
router.post('/', async (req, res) => {
  try {
    const nuevaExp = new Experiencia(req.body);
    const saved = await nuevaExp.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Obtener todas las experiencias (con filtros opcionales)
router.get('/', async (req, res) => {
  try {
    const query = {};
    const isAdmin = req.user?.role === 'admin'; // si tenés auth

    // Mostrar solo experiencias activas si no es admin
    if (!isAdmin) query.estado = true;

    // Filtro por lugar (con validación de ObjectId)
    if (req.query.lugar) {
      if (mongoose.Types.ObjectId.isValid(req.query.lugar)) {
        query.lugar = req.query.lugar;
      } else {
        return res.status(400).json({ error: 'ID de lugar inválido' });
      }
    }

    // Filtro por destacado
    if (req.query.destacado) {
      query.destacado = req.query.destacado === 'true';
    }

    // Filtro por estado si es admin
    if (req.query.estado && isAdmin) {
      query.estado = req.query.estado === 'true';
    }

    const experiencias = await Experiencia.find(query)
      .populate('lugar', 'nombre ubicacion categoria') // sólo los campos necesarios
      .sort({ prioridad: -1 });

    res.json(experiencias);
  } catch (err) {
    console.error('❌ Error al obtener experiencias:', err);
    res.status(500).json({ error: err.message });
  }
});

// Obtener solo experiencias destacadas
router.get('/destacadas', async (req, res) => {
  try {
    const experiencias = await Experiencia.find({
      estado: true,
      destacado: true
    })
      .populate('lugar', 'nombre ubicacion categoria')
      .sort({ prioridad: -1 });

    res.json(experiencias);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Obtener una experiencia por ID
router.get('/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'ID inválido' });
    }

    const experiencia = await Experiencia.findById(req.params.id)
      .populate('lugar');

    if (!experiencia || !experiencia.estado) {
      return res.status(404).json({ message: 'Experiencia no encontrada' });
    }

    res.json(experiencia);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Actualizar una experiencia por ID
router.put('/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'ID inválido' });
    }

    const updated = await Experiencia.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Eliminar una experiencia por ID
router.delete('/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'ID inválido' });
    }

    await Experiencia.findByIdAndDelete(req.params.id);
    res.json({ message: 'Experiencia eliminada correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
