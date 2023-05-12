const { fstat } = require("fs");
const Product = require("../models/product.model");
const multer = require('multer');
const path = require('path');
const sharp = require('sharp');
const fs = require('fs');

const storage = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null,path.join(__dirname,"..","public","images"));
    },
    filename : (req, file, cb) => {
        cb(null , file.fieldname +"-"+Date.now()+path.extname(file.originalname));
    }
});

exports.upload = multer({
    storage : storage,
    limits : {fileSize : 1024*1024*5}
});

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
        .populate("reviews.userId")
        .then((result) => {
            if (result) {
                res.status(200).json(result);
            } else {
                res.status(404).json(`no product with id : ${id} found`);
            }
        })
        .catch((err) => res.status(500).json("server crush"));
    };

exports.postAddProduct = async (req, res, next) => {
    const product = new Product(req.body);
    console.log(req.files);
    req.files.forEach(file => {
        const outputFileName = `eshop-${file.filename}`;
        const image = sharp(file.path)
            .resize(800,600)
            .jpeg({quality : 80})
            .toFile(path.join(__dirname,'..','public','images',outputFileName))
            .then(result => fs.unlinkSync(file.path));
        const index = outputFileName.lastIndexOf("\\");
        product.image.push(outputFileName.substring(index+1));
    });
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

exports.getProductsByCategory = (req, res, next) =>{
    const category = req.params.category.toUpperCase();
    Product.find({category : category})
        .then(products => {
            if (products.length > 0) {
                res.status(200).json(products);
            }else{
                res.status(404).json("no products found!");
            }
        })
        .catch(err => res.status(500).send(err));
}

exports.deleteOneProductById = (req, res, next) => {
    const id = req.params.id;
    Product.findOneAndDelete({productId : id})
        .then(result => res.status(200).json("product deleted succefuly"))
        .catch(err => res.status(500).send(err));
}

exports.deleteAll = (req, res, next) =>{
    Product.deleteMany()
        .then(result => res.status(200).send())
        .catch(err => console.log(err))
}

exports.postAddReview = (req, res, next) => {
    const id = req.params.id;
    Product.findOne({productId : id})
        .then(prodcut => {
            const review = req.body;
            review.date = Date.now();
            console.log(review);
            prodcut.reviews.push(review);
            prodcut.save()
                .then(updatedProduct => res.status(203).json(updatedProduct))
                .catch(err => res.status(500).send(err));
        })
        .catch(err => res.stats(500).send(err));
}