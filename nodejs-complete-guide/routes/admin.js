const express = require('express');

const productsController = require('../controllers/products');

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', productsController.getAddProduct)
  //res.sendFile(path.join(rootDir, 'views', 'add-product.html'));


// /admin/add-product => POST
router.post('/add-product', productsController.postAddproduct );

module.exports = router;
