
import Curta from '../models/curta.js'
import Diretor from '../models/diretor.js'
import Genero from '../models/genero.js'
import Turma from '../models/turma.js'

export default class GeralController {
 
    constructor() {
        this.home = async (req, res) => {
          const Curtas = await Curta.find({})
            .populate('genero')
            .populate('turma')
            .populate('diretor')
            .sort({ anoProducao: -1 })
            .limit(4)
          res.render('site/index', { Curtas })
        };

        this.curtas = async (req, res) => {
          const Curtas = await Curta.find({})
            .populate('genero')
            .populate('turma')
            .populate('diretor')
            .sort({ anoProducao: -1 })
          res.render('site/curtas', { Curtas })
        };

        this.diretores = async (req, res) => {
          const [Diretores, Curtas] = await Promise.all([
            Diretor.find({}).populate('turma').sort({ nome: 1 }),
            Curta.find({}).populate('diretor').sort({ anoProducao: -1 })
          ])
          res.render('site/diretores', { Diretores, Curtas })
        };

        this.turmas = async (req, res) => {
          const [Turmas, Curtas] = await Promise.all([
            Turma.find({}).sort({ curso: 1, semestreEntrada: -1 }),
            Curta.find({}).populate('diretor').populate('turma').sort({ anoProducao: -1 })
          ])
          res.render('site/turmas', { Turmas, Curtas })
        };

        this.generos = async (req, res) => {
          const [Generos, Curtas] = await Promise.all([
            Genero.find({}).sort({ nome: 1 }),
            Curta.find({}).populate('genero').sort({ anoProducao: -1 })
          ])
          res.render('site/generos', { Generos, Curtas })
        };

        this.teste = async (req, res) => {
          const resultado = "teste";
          res.render('index2',{teste: resultado});
        };

        this.formulario = async (req, res) => {
          res.render('index')
        };

    }
 }

