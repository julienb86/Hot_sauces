const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const sauceCtrl = require('../controllers/sauce');

const multer = require('../middleware/multer-config');
/* need to add auth below */
router.post('/',multer, sauceCtrl.createSauce);
router.get('/', sauceCtrl.getAllSauces);
router.get('/:id', sauceCtrl.getOneSauce);
router.put('/:id', multer, sauceCtrl.modifySauce);

module.exports = router;