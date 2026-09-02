import conexao from '../config/conexao.js'

const Turma = conexao.Schema({
    semestreEntrada: {type:String, required:true},
    curso: {type:String, required:true},
    foto:{type:Buffer,
         get: (valor) => {
           if (!valor) return null;
             return `data:image/png;base64,${valor.toString('base64')}`;
         },
         required:false}
})

export default conexao.model('Turma',Turma)