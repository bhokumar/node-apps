const products = []

exports.getAddProduct = (req, res, next) => {
    res.render('add-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        formsCSS: true,
        activeAddProducts: true,
        productsCSS: true
    });
}

exports.postAddproduct = (req, res, next) => {
    products.push({
        title: req.body.title
    });
    res.redirect('/');
}

exports.getProducts = (req, res, next) => {
    res.render('shop', {
        prods: products,
        pageTitle: 'Shop',
        path: '/',
        hasProducts: products.length > 0,
        activeShop: true,
        productsCSS: true
    });
}