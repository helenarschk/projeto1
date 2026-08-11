import conexao from '../config/conexao.js'

const Turma = conexao.Schema({
    semestreEntrada: {type:String, required:true},
    curso: {type:String, required:true},
    foto: {type:Buffer, required:true}
})

export default conexao.model('Turma',Turma)