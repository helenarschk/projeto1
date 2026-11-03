import express from 'express';
const router = express.Router();
import controller from '../controllers/controller.js'
const controle = new controller();

router.get('/', controle.home)
router.get('/curtas', (req, res) => res.render('site/curtas'))
router.get('/diretores', (req, res) => res.render('site/diretores'))
router.get('/turmas', (req, res) => res.render('site/turmas'))
router.get('/generos', (req, res) => res.render('site/generos'))
router.get('/teste', controle.teste)
router.post('/formulario', controle.formulario)
export default router