//importar o Model
import Diretor from '../models/diretor.js'

export default class DiretorController{

    constructor(caminhoBase='diretor/'){
        this.caminhoBase = caminhoBase
    
        this.openAdd = async(req, res)=>{
            res.render(caminhoBase + "add")
        }
        this.add = async(req, res)=>{
            //cria o Diretor
           
            await Diretor.create({
                nome: req.body.nome,
                Diretor: req.body.Diretor,
                foto: req.body.foto
            });
            res.redirect('/'+caminhoBase + 'add');
        }
        this.list = async(req, res)=>{
            const resultado = await Diretor.find({})
            res.render(caminhoBase + 'lst', {Diretores:resultado})
        }
        this.find = async(req, res)=>{
            const filtro = req.body.filtro;
            const resultado = await 
            Diretor.find({ nome: { $regex: filtro,
                $options: "i" }})
            res.render(caminhoBase + 'lst', {Diretores:resultado})
        }

     

         this.openEdt = async(req, res)=>{
            //passar quem eu quero editar
            const id = req.params.id
            console.log(id)
            const diretor = await Diretor.findById(id) 
            console.log(diretor)
            res.render(caminhoBase + "edt", 
                {Diretor:diretor})
        }


        this.edt = async(req, res)=>{
        await Diretor.findByIdAndUpdate(req.params.id, req.body)
        res.redirect('/'+caminhoBase + 'lst');
        
        }

         this.del = async(req, res)=>{
        await Diretor.findByIdAndDelete(req.params.id)
        res.redirect('/'+caminhoBase + 'lst');
        
        }

    }
}