Link do video requisitado pelo professor: https://youtu.be/HC-hUTlaHY0

# Projeto Banco de dados - Tela para cadastro de veiculos

Implementação de um sistema de read e insert utilizando as tecnologias React js, para construção do frontend, Node js para conexão com a base e banco de dados MYSQL, ao qual utizamos para criar, guardar, inserir e listar os nossos dados, bem como construir a base de alimentação do backend.

## Interface

## Backend

Para trabalhar com o mysql no backend, foi utilizado a biblioteca [Sequelize](https://sequelize.org/api/v6/identifiers), no qual se trata de uma tecnologia Node.js (para integração SQL), para Oracle, Postgres, MySQL, MariaDB, SQLite e SQL Server e muito mais. Com suporte a transações sólidas, relações, carregamento rápido e lento, replicação de leitura e muito mais.

Na parte de comunicação entre as rotas, foi usado a biblioteca cors, no qual serve como um mecanismo utilizado pelos navegadores para compartilhar recursos entre diferentes origens.

## Implementação - Sequileze

```Código
import { Sequelize } from "sequelize";

const db =  new Sequelize('projeto', 'root','', {
    host: 'localhost',
    password:'root',
    dialect: 'mysql'
})

export default db;
```
Configuração de conexão

```Código
import { Sequelize } from "sequelize";
import db from "../config/database.js";
     
const { DataTypes } = Sequelize;
     
const modelCar = db.define('carros',{
        Serie:{
            type: DataTypes.STRING 
        },
        Marca:{
            type: DataTypes.STRING
        },
        Modelo:{
            type: DataTypes.STRING
        },
        createdAt:{
            type: DataTypes.DATE
        }
    },{
        freezeTableName: true
     });
     
export default modelCar;
```
Configuração do padrão de retorno das consultas.

```Código
import modelCar from "../models/carModel.js";   

export const getAllCars = async (req,res) => {

    try{
        const carros = await modelCar.findAll();
        res.json(carros);
    } catch(err){
        res.json({message: err.message});
    }
    
};

export const getCarrId = async (req, res) => {
    try{
        const carros = await modelCar.findAll({
            where: {id: req.params.id}
        });
        res.json(carros[0]);
    }catch(err){
        res.json({message: err.message});
    }
};

export const createCarro = async (req, res) => {
    try{
        //console.log(req.body); // USE ESSE CONSOLE PARA SABER SE TA CHEGANDO VALORES (nao esquece de reiniciar o backend a cada salvar)
        await modelCar.create(req.body); 
         res.json({
             "Mensagem": "Produto criado"
         });
    }catch(err){
        res.json({message: err.message});
    }
};

export const updateCarro = async (req, res) => {
    try {
        await modelCar.update(req.body, {
            where : {
                id: req.params.id
            }
        });
        res.json({
            "message": "Product Updated"});
        } catch (error) {
        res.json({ message: error.message });}
};

export const deleteCarro = async (req, res) => {
    try {
        await modelCar.destroy({
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message": "Carro deletado"
        });
    }catch (error) {
        res.json({message : error.message});
    };
};
```
Funções de transformação dos dados no banco.

## Implementação - Cors

```Código
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
```
Implementado nos recursos do server.

## Frontend
Para o frontend foram empregas as biblíotecas BULMA, Axios, react-router-dom e qs.

* Bulma: para estilização da nossa pagína, formulário e tabela. 
* Axios: 
* reac-router-dom: 
* qs: 


```Código
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "bulma/css/bulma.css";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```
Estelização e importação react

```Código
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import CarList from "./components/CarList";
import AddCar from './components/AddCar';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<CarList/>}/>
        <Route path='add' element={<AddCar/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```
Importação das rotas utilizadas na aplicação.

```Código
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';

const CarList = () => {
    const [cars, setCar] =  useState([]);
    useEffect(() =>{
        
        getCars();
    }, [])

    const getCars = async () => {
        const response = await axios.get('http://localhost:5000/carros');
        console.log(response);
        setCar(response.data);
    }

    const deleteCar = async (id) => {

        
        try {
            axios({
                method: 'DELETE',
                url: "http://localhost:5000/carros/12",
                headers: { 'Content-Type': 'application/json' },
              });
              
            getCars();
        } catch (error) {
            console.log(id);
            console.log(error);
            alert(error.message);
        }
    };


  return (
    <div className="columns mt-5 is-centered">
        <div className="column is-half">
            <Link to="add" className='button is-success'>Cadastrar Carro</Link>
            <table className='table is-striped is-fullwidth'>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Serie</th>
                        <th>Marca</th>
                        <th>Modelo</th>
                        <th>Ano</th>
                    </tr>
                </thead>
                <tbody>
                    {cars.map((cars, i) =>(
                                        <tr key={cars.id} >
                                            <td>{i+1}</td>
                                            <td>{cars.Serie}</td>
                                            <td>{cars.Marca}</td>
                                            <td>{cars.Modelo}</td>
                                            <td>{cars.createdAt}</td>
                                            <td><button onClick={(e) => deleteCar(cars.id, e)} className='button is-small is-danger'>Deletar</button></td>
                                        </tr>

                    ))}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default CarList
```
Função responsável pela listagem dos dados vindos do backend, observe que ` <Link to="add" className='button is-success'>Cadastrar Carro</Link>` faz referência a tela de registro de veículos.
```
import React, { useState } from 'react'
import axios from 'axios'
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

const AddCar = () => {
    // essas tuas variaveis se tornaram sem sentido, poir agora voce nao usa mais elas, voce ta usando os forms com name="" na class
    const navigate = useNavigate();

    const saveCar = async (e) => {
        e.preventDefault();

        // cria um novo objeto do tipo FormData a partir do evento submit do formulario
        const formData = new FormData(e.target);
        // depois pega todos as ENTRIES (valores) do formulario e coloca numa variavel chamada formProps
        const formProps = Object.fromEntries(formData);


        try {
            const options = {
                method: 'POST',
                // o nome do header que suporta o padrao de url Model=aa&Ano=2001 é esse aquim xx-form-url....
                headers: { 'content-type': 'application/x-www-form-urlencoded' },
                // a variavel formProps voce passa como dado, mas usando o conversor qa.stringify pra ele gerar aquele padrao
                data: qs.stringify(formProps),
                url: "http://localhost:5000/carros",
              };

              await axios(options);

            navigate("/");
        } catch (error) {
            console.log(error);
            alert(error.message);
        }
    }

    return (
        <div className="columns mt5 is-centered">
            <div className="column is-half">
                <form onSubmit={saveCar}>
                    <div className='field'>
                        <label className="label">Serie</label>
                        <div className='control'>
                            <input type="text" name="Serie" className="input" placeholder='Serie' />
                        </div>
                    </div>

                    <div className='field'>
                        <label className="label">Marca</label>
                        <div className='control'>
                            <input type="text" name="Marca" className="input"  placeholder='Marca' />
                        </div>
                    </div>

                    <div className='field'>
                        <label className="label">Modelo</label>
                        <div className='control'>
                            <input type="text" name="Modelo" className="input" placeholder='Modelo' />
                        </div>
                    </div>

                    <div className='field'>
                        <label className="label">Ano</label>
                        <div className='control'>
                            <input type="text" name="Ano" className="input"  placeholder='Ano' />
                        </div>
                    </div>
                    <div className='field'>
                        <button type="submit" className="button is-success">Salvar</button>

                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddCar;
```
Tela de registro e envio de dados via fomulário doc.



