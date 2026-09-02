import conexao from '../config/conexao.js'

const Diretor = conexao.Schema({
    nome: {type:String, required:true},
    turma: {type:conexao.Schema.Types.ObjectId, ref:'Turma'},
    foto:{type:Buffer,
         get: (valor) => {
           if (!valor) return null;
             return `data:image/png;base64,${valor.toString('base64')}`;
         },
         required:false}
})

export default conexao.model('Diretor',Diretor)