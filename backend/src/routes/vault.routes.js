import express from 'express';
import {
  getAllPasswords,
  createPassword,
  updatePassword,
  deletePassword,
} from '../controllers/vault.controller.js';

const router = express.Router();

router.get('/', getAllPasswords);
router.post('/', createPassword);
router.put('/:id', updatePassword);
router.delete('/:id', deletePassword);

export default router;
