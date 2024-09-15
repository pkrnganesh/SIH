const express = require('express');
const {getCarriers, createCarriers, updateCarrier, deleteCarrier,getCareerGuidance} = require('../controllers/CarrierController');

const router = express();

router.get('/', getCarriers);
router.post('/create', createCarriers); // Ensure createCarriers is defined and exported from carrierController
router.put('/update', updateCarrier);
router.delete('/delete', deleteCarrier);
router.post('/guidance', getCareerGuidance);

module.exports = router;    