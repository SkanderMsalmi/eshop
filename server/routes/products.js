var express = require("express");
var router = express.Router();
const productController = require("../controllers/product");

router.get("/all", productController.getAllProducts);
router.get("/:id", productController.getOneProduct);
router.post("/new", productController.upload.single('image'), productController.postAddProduct);
router.put("/edit", productController.putUpdateProduct);
router.delete("/delete", productController.deleteOneProduct);


module.exports = router;