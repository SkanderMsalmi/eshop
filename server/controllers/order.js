const Order = require("../models/order.model");
const User = require("../models/user.model");

exports.getAllOrders = (req, res, next) => {
  Order.find()
    .populate("userId")
    .then((orders) => {
      if (orders.length > 0) {
        res.status(200).json(orders);
      } else {
        res.status(404).json("no orders found!");
      }
    })
    .catch((err) => {
      res.status(500).send();
    });
};

exports.getUserFromOrder = async (req, res, next) => {
  const idOrder = req.params.id;
  Order.findById(idOrder).then(async (o) => {
    User.findById(o.userId)
      .then((u) => {
        return res.status(200).json(u);
      })
      .catch((err) => res.status(404).json("User Not Found"));
  });
};

exports.getOrder = async (req, res, next) => {
  const order = await Order.findById(req.params.id)
    .populate("userId")
    .populate({
      path: "products.product",
      select: "name category price reviews",
    })
    .lean();
  order.products.forEach((product) => {
    let totalScore = 0;
    let averageRating = 0;
    const reviews = product.reviews ? product.reviews : 0;
    const feedbackCount = reviews ? reviews.length : 0;

    if (reviews != 0 && feedbackCount != 0) {
      totalScore = reviews.reduce((sum, review) => sum + review.score, 0);
      averageRating = feedbackCount > 0 ? totalScore / feedbackCount : 0;
    } else {
      totalScore = 0;
      averageRating = 0;
    }

    product.calculatedRating = averageRating;
    product.feedbackCount = feedbackCount;
  });
  res.status(200).json(order);
};

exports.postNewOrder = (req, res, next) => {
  const order = new Order(req.body);
  order.date = new Date();
  Order.find()
    .sort({ orderId: -1 })
    .limit(1)
    .exec()
    .then((orders) => {
      var id = 1;
      if (orders.length > 0) {
        id = orders[0].orderId + 1;
      }
      order.orderId = id;
      order
        .save()
        .then((result) => res.status(201).json(result))
        .catch((err) => console.log(err));
    })
    .catch((err) => res.status(500).json(err));
};

exports.putUpdateOrder = (req, res, next) => {
  Order.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true })
    .then((order) => res.status(201).json(order))
    .catch((err) => res.status(500).send());
};

exports.deleteOrder = (req, res, next) => {
  Order.findOneAndDelete({ _id: req.body._id })
    .then((result) => res.status(200).json("order deleted succefuly"))
    .catch((err) => res.status(500).send(err));
};

exports.deleteOrderById = (req, res, next) => {
  Order.findOneAndDelete({ _id: req.params.id })
    .then((result) => res.status(200).json("order deleted succefuly"))
    .catch((err) => res.status(500).send(err));
};

exports.putChangeOrderStatusToDelivered = (req, res, next) => {
  const id = req.params.id;
  Order.findOne({ orderId: id })
    .then((order) => {
      if (order.status === "PENDING") {
        order.status = "DELIVERED";
        Order.updateOne({ _id: order._id }, order, { new: true }).then(
          (result) => res.status(201).json(order)
        );
      } else {
        res.status(401).send();
      }
    })
    .catch((err) => res.status(500).send());
};

exports.changeStatusOrder = (req, res, next) => {
  const id = req.params.id;
  const status = req.body.status;
  console.log(status);
  Order.findById(id)
    .then((order) => {
      if (order.status == status) {
        res.status(401).json("It's already " + status);
      }
      order.status = status;
      Order.updateOne({ _id: order._id }, order, { new: true }).then((result) =>
        res.status(201).json(order)
      );
    })
    .catch((err) => console.log(err));
};

exports.getOrdersByUser = async (req, res, next) => {
  const userId = req.params.id;
  const orders = await Order.find({ userId });
  res.status(200).json(orders);
};
