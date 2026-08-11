import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import routes from './routes/route.js'; // rotas externas
import curtaRoutes from './routes/CurtaRoutes.js'; // rotas externas
import turmaRoutes from './routes/TurmaRoutes.js'; // rotas externas
import diretorRoutes from './routes/DiretorRoutes.js'; // rotas externas
import generoRoutes from './routes/GeneroRoutes.js'; // rotas externas

const PORT = 3000
const app = express();

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Caminho correto das views e public
const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

// Servir arquivos estáticos
app.use(express.static(join(__dirname, '/public')));
app.set('views', join(__dirname, '/views'));

// Rotas
app.use(curtaRoutes)
app.use(turmaRoutes)
app.use(diretorRoutes)
app.use(generoRoutes)
app.use(routes)
app.listen(PORT, ()=>{
 console.log(
    `Servidor rodando em http://localhost:${PORT}`)
});
// Exporta o handler compatível com Vercel
export default app;