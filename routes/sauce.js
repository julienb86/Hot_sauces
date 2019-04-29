const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const sauceCtrl = require('../controllers/sauce');


const multer = require('../middleware/multer-config');
/* need to add auth below */
router.post('/sauces',multer, sauceCtrl.createSauce);
router.get('/sauces', multer, sauceCtrl.getAllSauces);

module.exports = router;