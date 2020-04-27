const fs = require('fs');
const path = require('path');

const Cart = require('./cart');

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'products.json'
);

const getProductsFromFile = (cb) => {
    fs.readFile(p, (error, fileContent) => {
        if (error) {
            cb([]);
        } else {
            cb(JSON.parse(fileContent));
        }
    })
}

module.exports = class Product {
    constructor(id, title, imageUrl, description, price) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
        this.id = +id
    }

    save() {
        getProductsFromFile(products => {
            if (this.id) {
                const existingProductIndex = products.findIndex(prod => prod.id === +this.id);
                const updatedProducts = [...products];
                updatedProducts[existingProductIndex] = this;
                fs.writeFile(p, JSON.stringify(updatedProducts), error => {
                    if (error) {
                        console.log(error);
                    }
                });
            } else {
                this.id = Math.random();
                products.push(this);
                fs.writeFile(p, JSON.stringify(products), error => {
                    if (error) {
                        console.log(error);
                    }
                });
            }

        });
    }

    static fetchAll(cb) {
        getProductsFromFile(cb);
    }

    static deleteById(id) {
        getProductsFromFile(products => {
            const product = products.find(prod => prod.id === +id);
            const updatedProducts = products.filter(p => p.id !== +id);
            fs.writeFile(p, JSON.stringify(updatedProducts), error => {
                if (error) {
                    console.log('Error occurred while deleting file');
                } else {
                    Cart.deleteProduct(id, product.price);
                }
            });
        });
    }

    static findById(id, cb) {
        getProductsFromFile(products => {
            const product = products.find(p => p.id === +id);
            cb(product);
        });
    }
}