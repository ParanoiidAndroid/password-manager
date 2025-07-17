import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.routes.js';
import vaultRoutes from './routes/vault.routes.js'; // dsp la creo
import { verifyToken } from './middlewares/auth.middleware.js'; // dsp la creo

dotenv.config();

console.log(' JWT_SECRET:', process.env.JWT_SECRET);

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/vault', verifyToken, vaultRoutes); // protegida

// Conexión a MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log(' Conectado a MongoDB');
    app.listen(process.env.PORT, () =>
      console.log(` Servidor corriendo en puerto ${process.env.PORT}`)
    );
  })
  .catch(err => console.error(' Error al conectar a MongoDB:', err));
