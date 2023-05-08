const Product = require("../models/product.model");

exports.getAllProducts = (req, res, next) => {
    Product.find()
        .then((result) => {
            if (result.length > 0) {
                res.status(200).json(result);
            } else {
                res.status(404).json("no products found!");
            }
        })
        .catch((err) => res.status(500).json("server crush"));
    };

exports.getOneProduct = (req, res, next) => {
    const id = req.params.id;
    Product.findOne({ productId: id })
        .then((result) => {
            if (result) {
                res.status(200).json(result);
            } else {
                res.status(404).json(`no product with id : ${id} found`);
            }
        })
        .catch((err) => res.status(500).json("server crush"));
    };

exports.postAddProduct = (req, res, next) => {
    const product = new Product(req.body);
    Product.find()
        .sort({ productId: -1 })
        .limit(1)
        .exec()
        .then(products => {
                var id = 1 
                if (products.length > 0) {
                    id = products[0].productId + 1;
                }
                product.productId = id;
                product
                    .save()
                    .then((result) => res.status(201).json(result))
                    .catch((err) => res.status(500).json(err));
        })
        .catch(err => res.status(500).json(err));
    };

exports.deleteOneProduct = (req, res, next) => {
        Product.findOneAndDelete({_id : req.body._id})
            .then(result => res.status(200).json("product deleted succefuly"))
            .catch(err => res.status(500).send(err));
    }

exports.putUpdateProduct = (req, res, next) => {
    Product.findOneAndUpdate({_id : req.body._id}, req.body, {new : true})
        .then(product => res.status(201).json(product))
        .catch(err => res.status(500).send());
}