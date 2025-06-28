const express = require('express');
const {getCarriers, createCarriers, updateCarrier,getCareerAnalysis, deleteCarrier,getCareerGuidance} = require('../controllers/CarrierController');

const router = express();

router.get('/send-message-sms', getCarriers);
router.post('/send-message-whatsapp', createCarriers); // Ensure createCarriers is defined and exported from carrierController
router.put('/send-message-email', updateCarrier);



module.exports = router;    
