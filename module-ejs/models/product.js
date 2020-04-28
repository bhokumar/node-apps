const getDb = require('../util/database').getDb;

module.exports = class Product {
    constructor(id, title, imageUrl, description, price) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
        this.id = +id
    }

    save() {
        const db = getDb();
        db.collection('products')
        .insertOne(this)
        .then(result => {
            console.log(result);
        }).catch(error => {
            console.log(error);
        })
    }
}
