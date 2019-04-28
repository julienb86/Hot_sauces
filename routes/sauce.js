const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const sauceCtrl = require('../controllers/sauce');
const multer = require('../middleware/multer-config');

router.post('/sauces', auth, multer, sauceCtrl.createSauce);


module.exports = router;