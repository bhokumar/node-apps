const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/add-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        formsCSS: true,
        activeAddProducts: true,
        productsCSS: true
    });
}

exports.postAddproduct = (req, res, next) => {
    const {title, imageUrl, description, price} = req.body;
    
    const product = new Product(
        title,
        imageUrl,
        description,
        price
    );

    product.save();
    res.redirect('/');
}

exports.getProducts = (req, res, next) => {
    const products = Product.fetchAll((products) => {
        res.render('admin/products', {
            prods: products,
            pageTitle: 'Admin Products',
            path: '/admin/products'
        });
    });
}
