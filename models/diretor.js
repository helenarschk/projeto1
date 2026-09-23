import conexao from '../config/conexao.js'

const Diretor = conexao.Schema({
    nome: {type:String, required:true},
    turma: {type:conexao.Types.ObjectId, ref:'Turma', required:false},
    foto:{type:Buffer,
         get: (valor) => {
           if (!valor) return null;
             return `data:image/png;base64,${valor.toString('base64')}`;
         },
         required:false}
})

export default conexao.model('Diretor',Diretor)