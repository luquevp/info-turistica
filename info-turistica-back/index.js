const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const categoriaRoutes = require('./routes/categoria.routes');
const lugarRoutes = require('./routes/lugar.routes');
const alojamientoRoutes = require('./routes/alojamiento.routes');
const gastronomiaRoutes = require('./routes/gastronomia.routes');
const eventoRoutes = require('./routes/evento.routes');
const experienciaRoutes = require('./routes/experiencia.routes');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Conexión a Mongo
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('🟢 Conectado a MongoDB Atlas'))
  .catch(err => console.error('🔴 Error conectando a MongoDB:', err));

// ✅ Rutas antes del listen
app.use('/api/categorias', categoriaRoutes);
app.use('/api/lugares', lugarRoutes);
app.use('/api/alojamientos', alojamientoRoutes);
app.use('/api/gastronomia', gastronomiaRoutes);
app.use('/api/eventos', eventoRoutes);
app.use('/api/experiencias', experienciaRoutes); // <- esta es la clave

// Ruta base (opcional)
app.get('/', (req, res) => {
  res.send('Backend de información turística funcionando');
});

// ✅ Escuchar al final
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
