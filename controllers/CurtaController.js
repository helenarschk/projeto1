//importar o Model
import Curta from '../models/curta.js'
import Genero from '../models/genero.js'
import Turma from '../models/turma.js'
import Diretor from '../models/diretor.js'

export default class CurtaController{

    constructor(caminhoBase='curta/'){
        this.caminhoBase = caminhoBase
    
        this.openAdd = async(req, res)=>{
            const cgenero = await Genero.find({});
            const cturma = await Turma.find({});
            const cdiretor = await Diretor.find({});

            res.render(this.caminhoBase + "add", {
                Generos: cgenero,
                Turmas: cturma,
                Diretores: cdiretor
            })
        }

        this.add = async(req, res)=>{
            let dgenero = null;
            if (req.body.genero && req.body.genero !== '') {
                dgenero = await Genero.findById(req.body.genero)
            }

            let dturma = null;
            if (req.body.turma && req.body.turma !== '') {
                dturma = await Turma.findById(req.body.turma)
            }

            let ddiretor = null;
            if (req.body.diretor && req.body.diretor !== '') {
                ddiretor = await Diretor.findById(req.body.diretor)
            }

            await Curta.create({
                titulo: req.body.titulo,
                genero: dgenero,
                anoProducao: req.body.anoProducao,
                turma: dturma,
                sinopse: req.body.sinopse,
                diretor: ddiretor,
                link: req.body.link
            });

            res.redirect('/' + this.caminhoBase + 'add');
        }

        this.list = async(req, res)=>{
            const resultado = await Curta.find({}).populate('genero').populate('turma').populate('diretor')
            res.render(this.caminhoBase + 'lst', {Curtas:resultado})
        }

        this.find = async(req, res)=>{
            const filtro = req.body.filtro || '';
            const resultado = await Curta.find({
                titulo: { $regex: filtro, $options: 'i' }
            })
            res.render(this.caminhoBase + 'lst', {Curtas:resultado})
        }

        this.openEdt = async(req, res)=>{
            const id = req.params.id
            const curta = await Curta.findById(id)
                .populate('genero')
                .populate('turma')
                .populate('diretor')

            const cgenero = await Genero.find({});
            const cturma = await Turma.find({});
            const cdiretor = await Diretor.find({});

            res.render(this.caminhoBase + "edt", {
                Curta: curta,
                Generos: cgenero,
                Turmas: cturma,
                Diretores: cdiretor
            })
        }

        this.edt = async(req, res)=>{
            const genero = req.body.genero && req.body.genero !== '' ? req.body.genero : null;
            const turma = req.body.turma && req.body.turma !== '' ? req.body.turma : null;
            const diretor = req.body.diretor && req.body.diretor !== '' ? req.body.diretor : null;

            await Curta.findByIdAndUpdate(req.params.id, {
                titulo: req.body.titulo,
                genero,
                anoProducao: req.body.anoProducao,
                turma,
                sinopse: req.body.sinopse,
                diretor,
                link: req.body.link
            })

            res.redirect('/' + this.caminhoBase + 'lst');
        }

        this.del = async(req, res)=>{
            await Curta.findByIdAndDelete(req.params.id)
            res.redirect('/' + this.caminhoBase + 'lst');
        }
    }
}