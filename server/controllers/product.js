const { fstat } = require("fs");
const { ObjectId } = require("mongodb");
const Product = require("../models/product.model");
const SavedProducts = require("../models/saved-product.model");
const multer = require("multer");
const path = require("path");
const sharp = require("sharp");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "..", "public", "images"));
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname +
        "-" +
        file.originalname +
        "-" +
        Date.now() +
        path.extname(file.originalname)
    );
  },
});

exports.upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
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
  Product.findById(id)
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
  if (req.files) {
    req.files.forEach((file) => {
      const outputFileName = `eshop-${file.filename}`;
      const image = sharp(file.path)
        .resize(800, 600)
        .jpeg({ quality: 80 })
        .toFile(path.join(__dirname, "..", "public", "images", outputFileName))
        .then((result) => fs.unlinkSync(file.path));
      const index = outputFileName.lastIndexOf("\\");
      product.image.push(outputFileName.substring(index + 1));
    });
  }
  Product.find()
    .sort({ productId: -1 })
    .limit(1)
    .exec()
    .then((products) => {
      var id = 1;
      if (products.length > 0) {
        id = products[0].productId + 1;
      }
      product.productId = id;
      product
        .save()
        .then((result) => res.status(201).json(result))
        .catch((err) => res.status(500).json(err));
    })
    .catch((err) => res.status(500).json(err));
};

exports.deleteOneProduct = (req, res, next) => {
  Product.findOneAndDelete({ _id: req.body._id })
    .then((result) => res.status(200).json("product deleted succefuly"))
    .catch((err) => res.status(500).send(err));
};

exports.putUpdateProduct = (req, res, next) => {
  const id = req.params.id;
  const product = new Product(req.body);
  if (req.files) {
    req.files.forEach((file) => {
      const outputFileName = `eshop-${file.filename}`;
      const image = sharp(file.path)
        .resize(800, 600)
        .jpeg({ quality: 80 })
        .toFile(path.join(__dirname, "..", "public", "images", outputFileName))
        .then((result) => fs.unlinkSync(file.path));
      const index = outputFileName.lastIndexOf("\\");
      product.image.push(outputFileName.substring(index + 1));
    });
  }
  Product.findById(id)
    .then((existingProduct) => {
      product.reviews = existingProduct.reviews;
      return Product.findByIdAndUpdate(id, product);
    })
    .then((result) => res.status(200).json(result))
    .catch((err) => res.status(500).send(err));
};

exports.getProductsByCategory = (req, res, next) => {
  const category = req.params.category.toUpperCase();
  Product.find({ category: category })
    .then((products) => {
      if (products.length > 0) {
        res.status(200).json(products);
      } else {
        res.status(404).json("no products found!");
      }
    })
    .catch((err) => res.status(500).send(err));
};

exports.deleteOneProductById = (req, res, next) => {
  const id = req.params.id;
  Product.findByIdAndDelete(id)
    .then((result) => res.status(200).json("product deleted succefuly"))
    .catch((err) => res.status(500).send(err));
};

exports.deleteAll = (req, res, next) => {
  Product.deleteMany()
    .then((result) => res.status(200).send())
    .catch((err) => console.log(err));
};

exports.postAddReview = (req, res, next) => {
  const id = req.params.id;
  Product.findById(id)
    .then((product) => {
      const review = req.body;
      review.date = new Date();
      product.reviews.push(review);
      product
        .save()
        .then((updatedProduct) => res.status(203).json(updatedProduct))
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};

// Saved Products List

exports.getSavedProductsListByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    const savedProducts = await SavedProducts.findOne({ userId }).populate(
      "productsSaved"
    );

    if (!savedProducts) {
      return res.status(204).json({ message: "Saved products not found" });
    }
    const productIds = savedProducts.productsSaved.map(
      (product) => product._id
    );
    const products = await Product.aggregate([
      {
        $match: {
          _id: { $in: productIds },
        },
      },
      {
        $project: {
          productId: 1,
          name: 1,
          category: 1,
          price: 1,
          rating: 1,
          feedback: 1,
          image: 1,
        },
      },
    ]);

    return res.status(200).json(products);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Add product to saved list
exports.addProductToSavedList = async (req, res, next) => {
  const userId = req.params.userId;
  const productId = req.params.productId;
  console.log(userId);
  try {
    // Check if savedProducts list exists for the user
    let savedProducts = await SavedProducts.findOne({ userId });

    if (!savedProducts) {
      // If savedProducts list doesn't exist, create a new one and add the product to it
      savedProducts = new SavedProducts({
        userId,
        productsSaved: [productId],
      });

      await savedProducts.save();
      return res.status(200).json(savedProducts);
    } else {
      // If savedProducts list already exists, check if the product is already in the list
      if (savedProducts.productsSaved.includes(productId)) {
        return res
          .status(200)
          .json("Product Already Exists In Your Saved Product");
      } else {
        // If product is not already in the list, add it to the list and save the changes
        savedProducts.productsSaved.push(productId);
        await savedProducts.save();
        return res.status(200).json(savedProducts);
      }
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

// Delete product from saved list
exports.deleteSavedProductFromUser = async (req, res) => {
  const userId = req.params.userId;
  const productId = req.params.productId;
  console.log(userId, productId);
  try {
    const savedProducts = await SavedProducts.findOne({ userId });
    if (!savedProducts) {
      return res
        .status(404)
        .json({ message: "User's saved products not found" });
    }

    const productIndex = savedProducts.productsSaved.indexOf(productId);
    if (productIndex === -1) {
      return res
        .status(404)
        .json({ message: "Product doesn't exist in user's saved products" });
    }

    savedProducts.productsSaved.splice(productIndex, 1);
    await savedProducts.save();
    return res
      .status(200)
      .json({ message: "Product removed from user's saved products" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.clearSavedList = async (req, res, next) => {
  try {
    const result = await SavedProducts.deleteOne({
      _id: new ObjectId(req.params.id),
      userId: req.params.userId,
    });
    return res
      .status(203)
      .json({ message: " Your Saved List cleared Succesfully " });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.deleteReview = (req, res, next) => {
  const productId = req.params.id;
  Product.updateOne({ _id: productId }, { $pull: { reviews: req.body } })
    .then((result) => {
      Product.findById(productId).then((product) =>
        res.status(201).json(product)
      );
    })
    .catch((err) => console.log(err));
};

exports.getNewestProduct = async (req, res, next) => {
  try {
    const categories = ["MAN", "WOMAN", "KID"]; // Array of categories

    const productPromises = categories.map(async (category) => {
      const products = await Product.find({ category })
        .sort({ createdAt: -1 })
        .limit(10)
        .exec();

      return products;
    });

    const productsByCategory = await Promise.all(productPromises);

    res.status(200).json(productsByCategory);
  } catch (error) {
    console.error(error);
  }
};

exports.getSavedItemsCount = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const count = await SavedProducts.find({ userId }).countDocuments();
    console.log(count);
    return res.status(200).json(count);
  } catch (error) {
    console.error(error);
    return 0;
  }
};
