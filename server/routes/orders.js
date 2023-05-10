const express = require('express');
const router = express.Router();

const orderController = require("../controllers/order");

router.get("/all", orderController.getAllOrders);
router.get("/:id", orderController.getOrder);
router.post("/new", orderController.postNewOrder);
router.put('/edit', orderController.putUpdateOrder);
router.put('/deliver/:id', orderController.putChangeOrderStatusToDelivered);
router.put('/cancel/:id', orderController.putChangeOrderStatusToCanceled);
router.delete("/delete", orderController.deleteOrder);
router.delete("/delete/:id", orderController.deleteOrderById);

module.exports = router;