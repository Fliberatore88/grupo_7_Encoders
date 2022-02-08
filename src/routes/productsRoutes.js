const express = require ('express');
const router = express.Router();
const productsController = require ('../controllers/productsController');

router.get ('/', productsController.detalle)
router.get ('/car', productsController.car)
router.get ('/addProduct', productsController.addProduct)
router.get ('/editProduct', productsController.editProduct)

module.exports = router;