const express = require("express");
const router = express.Router();

const orderController = require("../controllers/order");

router.get("/all", orderController.getAllOrders);
router.get("/:id", orderController.getOrder);
router.get("/getOrdersByUser/:id", orderController.getOrdersByUser);
router.get("/getUserByOrderId/:id", orderController.getUserFromOrder);
router.post("/new", orderController.postNewOrder);
router.put("/edit", orderController.putUpdateOrder);
router.put("/changestatus/:id", orderController.changeStatusOrder);
router.delete("/delete", orderController.deleteOrder);
router.delete("/delete/:id", orderController.deleteOrderById);

module.exports = router;
