const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('shop/product-list', {
            prods: products,
            pageTitle: 'All Product',
            path: '/products'
        });
    });
}

exports.getProduct = (req, res, next) => {
    const {
        productId
    } = req.params;
    Product.findById(productId, product => {
        res.render('shop/product-details', {
            product: product,
            path: '/',
            pageTitle: product.title,
            path: '/products'
        });
    });
}

exports.addProductToCart = (req, res, next) => {
    const {
        productId
    } = req.body;

    Product.findById(productId, product => {
        Cart.addProduct(productId, product.price);
    });
    
    console.log(productId);
    res.redirect('/');
}

exports.getIndex = (req, res, next) => {
    const products = Product.fetchAll((products) => {
        res.render('shop/index', {
            prods: products,
            pageTitle: 'Shop',
            path: '/'
        });
    });
}

exports.getCart = (req, res, next) => {
    res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart'
    });
}

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders'
    });
}

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        path: '/checkout',
        pageTitle: 'Checkout'
    });
}