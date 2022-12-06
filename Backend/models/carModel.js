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