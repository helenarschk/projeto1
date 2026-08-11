import conexao from '../config/conexao.js'

const Curta = conexao.Schema({
    titulo: {type:String, required:true},
    ficha: {type:String, required:true},
    genero: {type:conexao.Schema.Types.ObjectId, ref:'Genero'},
    anoProducao: {type:Number, required:true},
    turma: {type:conexao.Schema.Types.ObjectId, ref:'Turma'},
    sinopse: {type:String, required:true},
    diretor: {type:conexao.Schema.Types.ObjectId, ref:'Diretor'},
    link: {type:String, required:true}
})

export default conexao.model('Curta',Curta)