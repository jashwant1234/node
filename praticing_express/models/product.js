const product = [];

module.exports = class Product {
    constructor(t){
        this.titel = t;
    }
    save(){
        product.push(this);
    }
    static fetchAll(){
        return product;
    }
}