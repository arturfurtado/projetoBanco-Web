import express from 'express';
import db from './config/database.js';
import carRoutes from './routes/routes.js';
import cors from 'cors';
import bodyParser from 'body-parser';

const port = 5000;
const app = express();

try {
    await db.authenticate();
    console.log('Conexão feita com sucesso');
} catch (err) {
    console.error(err);
}

app.use(cors());
app.use(express.json());

app.use(bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.use('/carros',carRoutes);

app.listen(port, () => console.log('Servidor rodando'));