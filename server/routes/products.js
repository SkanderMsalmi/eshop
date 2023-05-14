var express = require("express");
var router = express.Router();
const productController = require("../controllers/product");

router.get("/all", productController.getAllProducts);
router.get("/category/:category", productController.getProductsByCategory);
router.get("/:id", productController.getOneProduct);
router.post(
  "/new",
  productController.upload.array("image"),
  productController.postAddProduct
);
router.post("/addReview/:id", productController.postAddReview);
router.put("/edit", productController.putUpdateProduct);
router.delete("/delete", productController.deleteOneProduct);
router.delete("/deleteAll", productController.deleteAll);
router.delete("/delete/:id", productController.deleteOneProductById);

// saved products

router.get(
  "/allSavedProductByUserId/:userId",
  productController.getSavedProductsListByUserId
);
router.post(
  "/addProductToSavedList/:userId/:productId",
  productController.addProductToSavedList
);

router.post(
  "/deleteProductFromSavedProducts/:userId/:productId",
  productController.deleteSavedProductFromUser
);
router.delete("/clearSavedList/:id/:userId", productController.clearSavedList);

module.exports = router;
