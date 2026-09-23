import conexao from '../config/conexao.js'

const Curta = conexao.Schema({
    titulo: {type:String, required:true},
    ficha: {type:String, required:true},
    genero: {type:conexao.Types.ObjectId, ref:'Genero', required:false},
    anoProducao: {type:Number, required:true},
    turma: {type:conexao.Types.ObjectId, ref:'Turma', required:false},
    sinopse: {type:String, required:true},
    diretor: {type:conexao.Types.ObjectId, ref:'Diretor', required:false},
    link: {type:String, required:true}
})

export default conexao.model('Curta',Curta)