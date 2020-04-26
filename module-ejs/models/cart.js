const fs = require('fs');
const path = require('path');

const cartPath = path.join(path.dirname(process.mainModule.filename),
    'data',
    'cart.json'
);

module.exports = class Cart {
    static addProduct(id, productPrice) {
        fs.readFile(cartPath, (error, fileContent) => {
            let cart = {
                products: [],
                totalPrice: 0
            };
            if (!error) {
                cart = JSON.parse(fileContent);
            }

            // Analyze the cart
            const existingProductIndex = cart.products.findIndex(prod => prod.id == id);
            const existingProduct = cart.products[existingProductIndex];

            let updatedProduct;
            if (existingProduct) {
                updatedProduct = {
                    ...existingProduct
                };
                updatedProduct.qty = updatedProduct.qty + 1;

                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updatedProduct;
            } else {
                updatedProduct = {
                    id: id,
                    qty: 1
                };
                cart.products = [...cart.products, updatedProduct];
            }

            cart.totalPrice = cart.totalPrice + +productPrice;
            fs.writeFile(cartPath, JSON.stringify(cart), error => {
                if (error) {
                    console.log('Error occurred while saving file', error);
                }
            });
        });
    }

    static deleteProduct(id, productPrice) {
        fs.readFile(p, (error, fileContent) => {
            if (error) {
                return;
            }

            const updatedCart = {...cart};
        });
    }
}