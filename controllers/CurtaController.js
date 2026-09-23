//importar o Model
import Curta from '../models/curta.js'
import Genero from '../models/genero.js'
import Turma from '../models/turma.js'
import Diretor from '../models/diretor.js'

export default class CurtaController{

    constructor(caminhoBase='curta/'){
        this.caminhoBase = caminhoBase
    
        this.openAdd = async(req, res)=>{
            res.render(caminhoBase + "add")
        }
        this.add = async(req, res)=>{
            //cria o Curta
           
            let dgenero = null;
            if (req.body.genero != null)
            {
                dgenero = await Genero.findById(req.body.genero)
            }

            let dturma = null;
            if (req.body.turma != null)
            {
                dturma = await Turma.findById(req.body.turma)
            }

            let ddiretor = null;
            if (req.body.diretor != null)
            {
                ddiretor = await Diretor.findById(req.body.diretor)
            }

            await Curta.create({
                titulo: req.body.titulo,
                ficha: req.body.ficha,
                genero: cgenero,
                anoProducao: req.body.anoProducao,
                turma: cturma,
                sinopse: req.body.sinopse,
                diretor: cdiretor,
                link: req.body.link
            });
            res.redirect('/'+caminhoBase + 'add');
        }
        this.list = async(req, res)=>{
            const resultado = await Curta.find({}).populate('genero').populate('turma').populate('diretor')
            res.render(caminhoBase + 'lst', {Curtas:resultado})
        }
        this.find = async(req, res)=>{
            const filtro = req.body.filtro;
            const resultado = await 
            Curta.find({ nome: { $regex: filtro,
                $options: "i" }})
            res.render(caminhoBase + 'lst', {Curtas:resultado})
        }

     

         this.openEdt = async(req, res)=>{
            //passar quem eu quero editar
            const id = req.params.id
            console.log(id)
            const curta = await Curta.findById(id) 
            console.log(curta)
            const cgenero = await Genero.find({});
            const cturma = await Turma.find({});
            const cdiretor = await Diretor.find({});
            res.render(caminhoBase + "edt", 
                {Curta: curta, Generos: cgenero, Turmas: cturma, Diretores: cdiretor})
        }


        this.edt = async(req, res)=>{
        await Curta.findByIdAndUpdate(req.params.id, req.body)
        res.redirect('/'+caminhoBase + 'lst');
        
        }

         this.del = async(req, res)=>{
        await Curta.findByIdAndDelete(req.params.id)
        res.redirect('/'+caminhoBase + 'lst');
        
        }

    }
}