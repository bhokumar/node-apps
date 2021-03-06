const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', adminController.getAddProduct)
  //res.sendFile(path.join(rootDir, 'views', 'add-product.html'));

router.get('/products', adminController.getProducts);
// /admin/add-product => POST
router.post('/add-product', adminController.postAddproduct );

module.exports = router;
