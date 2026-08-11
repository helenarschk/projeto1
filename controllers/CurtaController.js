//importar o Model
import Curta from '../models/curta.js'

export default class CurtaController{

    constructor(caminhoBase='curta/'){
        this.caminhoBase = caminhoBase
    
        this.openAdd = async(req, res)=>{
            res.render(caminhoBase + "add")
        }
        this.add = async(req, res)=>{
            //cria o Curta
           
            await Curta.create({
                titulo: req.body.titulo,
                ficha: req.body.ficha,
                genero: req.body.genero,
                anoProducao: req.body.anoProducao,
                turma: req.body.turma,
                sinopse: req.body.sinopse,
                diretor: req.body.diretor,
                link: req.body.link
            });
            res.redirect('/'+caminhoBase + 'add');
        }
        this.list = async(req, res)=>{
            const resultado = await Curta.find({})
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
            const Curta = await Curta.findById(id) 
            console.log(Curta)
            res.render(caminhoBase + "edt", 
                {Curta:Curta})
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