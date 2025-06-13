import express from 'express';
import { findNearbyPharmacies } from '../controller/pharmacyController.js';

import { createPharmacy, addInventoryItem } from '../controller/pharmacyController.js';



const router = express.Router();

router.get('/search', findNearbyPharmacies);
router.post('/add-inventory', addInventoryItem); 
router.post('/create', createPharmacy); // POST /api/pharmacy/create
export default router;
