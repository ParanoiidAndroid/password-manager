import PasswordEntry from '../models/PasswordEntry.js';
import { encrypt, decrypt } from '../utils/crypto.js';

export const getAllPasswords = async (req, res) => {
  try {
    const entries = await PasswordEntry.find({ userId: req.user.userId });
    const decryptedEntries = entries.map(entry => ({
      ...entry.toObject(),
      password: decrypt(entry.password),
    }));

    res.status(200).json(decryptedEntries);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener contraseñas' });
  }
};

export const createPassword = async (req, res) => {
  const { service, username, password, notes } = req.body;

  try {
    const encryptedPassword = encrypt(password);

    const newEntry = new PasswordEntry({
      userId: req.user.userId, // 
      service,
      username,
      password: encryptedPassword,
      notes,
    });

    await newEntry.save();
    res.status(201).json({ message: 'Contraseña guardada correctamente' });
  } catch (err) {
    console.error("❌ Error en createPassword:", err);
    res.status(500).json({ message: 'Error al guardar contraseña' });
  }
};

export const updatePassword = async (req, res) => {
  const { id } = req.params;
  const { service, username, password, notes } = req.body;

  try {
    const encryptedPassword = encrypt(password);

    await PasswordEntry.findOneAndUpdate(
      { _id: id, userId: req.user.userId },
      {
        service,
        username,
        password: encryptedPassword,
        notes,
        updatedAt: new Date(),
      }
    );

    res.status(200).json({ message: 'Entrada actualizada' });
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar entrada' });
  }
};

export const deletePassword = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await PasswordEntry.findOneAndDelete({
      _id: id,
      userId: req.user.userId,
    });

    if (!deleted) {
      return res.status(404).json({ error: 'Contraseña no encontrada' });
    }

    res.json({ message: 'Contraseña eliminada correctamente' });
  } catch (err) {
    console.error('Error al eliminar contraseña:', err);
    res.status(500).json({ error: 'Error al eliminar contraseña' });
  }
};
