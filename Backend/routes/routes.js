import express from 'express';

import {
    getAllCars,
    getCarrId,
    createCarro,
    updateCarro,
    deleteCarro
} from '../../Backend/controllers/carController.js';

const router = express.Router();

router.post('/', createCarro);
router.get('/', getAllCars);
router.get('/:id', getCarrId);
// router.get('/:id', updateCarro);
router.delete('/:id', deleteCarro);

export default router;