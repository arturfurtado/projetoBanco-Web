# Projeto Banco de dados - Tela para cadastro de veiculos

Implementação de um sistema de read e insert utilizando as tecnologias React js, para construção do frontend, Node js para conexão com a base e banco de dados MYSQL, ao qual utizamos para criar, guardar, inserir e listar os nossos dados, bem como construir a base de alimentação do backend.

## Interface

## Backend

Para trabalhar com o mysql no backend, foi utilizado a biblioteca [Sequelize](https://sequelize.org/api/v6/identifiers), no qual se trata de uma tecnologia Node.js (para integração SQL), para Oracle, Postgres, MySQL, MariaDB, SQLite e SQL Server e muito mais. Com suporte a transações sólidas, relações, carregamento rápido e lento, replicação de leitura e muito mais.

## Implementação

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
Funções de transfamação dos dados no banco.


## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
