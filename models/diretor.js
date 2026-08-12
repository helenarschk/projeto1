import conexao from '../config/conexao.js'

const Diretor = conexao.Schema({
    nome: {type:String, required:true},
    turma: {type:conexao.Schema.Types.ObjectId, ref:'Turma'},
    foto: {type:Buffer, required:false}
})

export default conexao.model('Diretor',Diretor)