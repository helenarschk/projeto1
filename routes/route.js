import express from 'express';
const router = express.Router();
import controller from '../controllers/controller.js'
const controle = new controller();

router.get('/', controle.home)
router.get('/curtas', controle.curtas)
router.get('/diretores', controle.diretores)
router.get('/turmas', controle.turmas)
router.get('/generos', controle.generos)
router.get('/teste', controle.teste)
router.post('/formulario', controle.formulario)
export default router