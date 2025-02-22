

import express from 'express';
import { getAllUsers, register } from '../controllers/controller.js';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Set up storage engine for Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../uploads/'));
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

const router = express.Router();

router.post('/register', upload.fields([{ name: 'passportPhoto' }, { name: 'paymentReceipt' }]), register);
router.get('/users', getAllUsers)

export default router;
