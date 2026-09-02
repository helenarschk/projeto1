import express from 'express';
const router = express.Router();

import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage });

//Busca o TurmaController
import TurmaController from '../controllers/TurmaController.js'

const controle = new TurmaController();

const caminhobase = 'turma/'

router.get('/' + caminhobase + 'add', controle.openAdd)
router.post('/' + caminhobase + 'add', upload.single('foto'), controle.add)
router.get('/' + caminhobase + 'lst', controle.list)
router.post('/' + caminhobase + 'lst', controle.find)
router.get('/' + caminhobase + 'del/:id', controle.del)
router.get('/' + caminhobase + 'edt/:id', controle.openEdt)
router.post('/' + caminhobase + 'edt/:id', upload.single('foto'), controle.edt)
export default router