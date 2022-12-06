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