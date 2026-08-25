//importar o Model
import Turma from '../models/turma.js'

export default class TurmaController{

    constructor(caminhoBase='turma/'){
        this.caminhoBase = caminhoBase
    
        this.openAdd = async(req, res)=>{
            res.render(caminhoBase + "add")
        }
        this.add = async(req, res)=>{
            //cria o Turma
           
            await Turma.create({
                semestreEntrada: req.body.semestreEntrada,
                curso: req.body.curso,
                foto: req.body.foto
            });
            res.redirect('/'+caminhoBase + 'add');
        }
        this.list = async(req, res)=>{
            const resultado = await Turma.find({})
            res.render(caminhoBase + 'lst', {Turmas:resultado})
        }
        this.find = async(req, res)=>{
            const filtro = req.body.filtro;
            const resultado = await 
            Turma.find({ nome: { $regex: filtro,
                $options: "i" }})
            res.render(caminhoBase + 'lst', {Turmas:resultado})
        }

     

         this.openEdt = async(req, res)=>{
            //passar quem eu quero editar
            const id = req.params.id
            console.log(id)
            const turma = await Turma.findById(id) 
            console.log(turma)
            res.render(caminhoBase + "edt", 
                {Turma:turma})
        }


        this.edt = async(req, res)=>{
        await Turma.findByIdAndUpdate(req.params.id, req.body)
        res.redirect('/'+caminhoBase + 'lst');
        
        }

         this.del = async(req, res)=>{
        await Turma.findByIdAndDelete(req.params.id)
        res.redirect('/'+caminhoBase + 'lst');
        
        }

    }
}