//importar o Model
import Diretor from '../models/diretor.js'
import Turma from '../models/turma.js'

export default class DiretorController{

    constructor(caminhoBase='diretor/'){
        this.caminhoBase = caminhoBase
    
        this.openAdd = async(req, res)=>{
            res.render(caminhoBase + "add")
        }

        this.openAdd = async(req, res)=>{
        // Buscar a entidade relacionada para permitir seleção
        const resultado = await Turma.find({});
        // Enviar na renderização a lista de turmas
        res.render(caminhoBase + "add", {
        Turmas: resultado})
}
        
        this.add = async(req, res)=>{
            //cria o Diretor
           
            let dturma = null;
            if (req.body.genero != null)
            {
                dturma = await Turma.findById(req.body.turma)
            }

            await Diretor.create({
                nome: req.body.nome,
                turma: dturma,
                foto: req.body.foto
            });
            res.redirect('/'+caminhoBase + 'add');
        }
        this.list = async(req, res)=>{
            const resultado = await Diretor.find({}).populate('turma')
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
            const dturma = await Turma.find({});
            res.render(caminhoBase + "edt", 
                {Diretor: diretor, Turmas: dturma})
        }


        this.edt = async(req, res)=>{
        await Diretor.findByIdAndUpdate(req.params.id, req.body)
        res.redirect('/'+caminhoBase + 'lst');
        
        }

         this.del = async(req, res)=>{
        await Diretor.findByIdAndDelete(req.params.id)
        res.redirect('/'+caminhoBase + 'lst');
        
        }

        this.add = async(req, res)=>{
            //cria o Diretor
           let fotoEnviada
           if(req.file!=null){
            console.log(" foi")
            fotoEnviada = req.file.buffer
           }
           else{
            console.log("nao foi")
            fotoEnviada = null
           }
            
            await Diretor.create({
                nome: req.body.nome,
                turma:req.body.turma,
                foto:fotoEnviada
            });
            res.redirect('/'+caminhoBase + 'add');
        }
    }
}