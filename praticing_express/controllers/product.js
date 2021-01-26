const Product = require('../models/product')

exports.getAddProduct=(req, res, next) => {
    res.render('add-product', {
      pageTitle: 'Add Product',
      path: '/admin/add-product'
    });
  }

  exports.postAddProduct =(req, res, next) => {
    const product =  new Product(req.body.title);
    product.save();
    console.log(product);
    res.redirect('/');
  }
  exports.getProducts = (req, res, next) => {
    const products = Product.fetchAll();
    res.render('shop', {
      prods: products,
      pageTitle: 'Shop',
      path: '/',
  
    });
  }

  exports.error404 = (req, res, next) => {
    res.status(404).render('404', { pageTitle: 'Page Not Found' ,path : ''});
  }