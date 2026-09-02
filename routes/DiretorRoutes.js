import express from 'express';
const router = express.Router();

import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage });

//Busca o DiretorController
import DiretorController from '../controllers/DiretorController.js'
const controle = new DiretorController();

const caminhobase = 'diretor/'

router.get('/' + caminhobase + 'add', controle.openAdd)
router.post('/' + caminhobase + 'add', upload.single('foto'), controle.add)
router.get('/' + caminhobase + 'lst', controle.list)
router.post('/' + caminhobase + 'lst', controle.find)
router.get('/' + caminhobase + 'del/:id', controle.del)
router.get('/' + caminhobase + 'edt/:id', upload.single('foto'), controle.openEdt)
router.post('/' + caminhobase + 'edt/:id', controle.edt)
export default router