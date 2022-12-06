import { Sequelize } from "sequelize";

const db =  new Sequelize('projeto', 'root','', {
    host: 'localhost',
    password:'root',
    dialect: 'mysql'
})

export default db;