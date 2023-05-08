const Order = require("../models/order.model");

exports.getAllOrders = (req, res, next) =>{
    Order.find()
        .then(orders => {
            if (orders.length > 0) {
                res.status(200).json(orders);
            } else {
                res.status(404).json("no orders found!");
            }
        })
        .catch(err => {
            res.status(500).send();
        })
}

exports.getOrder = (req, res, next) => {
    Order.findOne({orderId : req.params.id})
        .then(order => {
            if (order) {
                order.populate('userId');
                res.status(200).json(order);
            } else {
                res.status(404).json(`order with id ${req.params.id} not found!`);
            }
        })
        .catch(err => res.status(500).send(err));
}

exports.postNewOrder = (req, res, next) => {
    const order = new Order(req.body);
    order.date = new Date();
    Order.find()
        .sort({ orderId: -1 })
        .limit(1)
        .exec()
        .then(orders => {
                var id = 1 
                if (orders.length > 0) {
                    id = orders[0].orderId + 1;
                }
                order.orderId = id;
                order
                    .save()
                    .then((result) => res.status(201).json(result))
                    .catch((err) => res.status(500).json(err));
        })
        .catch(err => res.status(500).json(err));
}

exports.putUpdateOrder = (req, res, next) => {
    Order.findOneAndUpdate({_id : req.body._id}, req.body, {new : true})
    .then(order => res.status(201).json(order))
    .catch(err => res.status(500).send());
}

exports.deleteOrder = (req, res, next) => {
    Order.findOneAndDelete({_id : req.body._id})
    .then(result => res.status(200).json("order deleted succefuly"))
    .catch(err => res.status(500).send(err));
}

exports.deleteOrderById = (req, res, next) => {
    Order.findOneAndDelete({orderId : req.params.id})
    .then(result => res.status(200).json("order deleted succefuly"))
    .catch(err => res.status(500).send(err));
}

exports.putChangeOrderStatusToDelivered = (req, res, next) => {
    const id = req.params.id;
    Order.findOne({orderId:id})
        .then(order => {
            if (order.status === "PENDING") {
                order.status = "DELIVERED";
                Order.updateOne({_id : order._id}, order, {new : true})
                    .then(result => res.status(201).json(order));
            }else{
                res.status(401).send();
            }
            
        })
        .catch(err => res.status(500).send());
}

exports.putChangeOrderStatusToCanceled = (req, res, next) => {
    const id = req.params.id;
    Order.findOne({orderId:id})
        .then(order => {
            if (order.status === "PENDING" || order.status === "DELIVERED") {
                order.status = "CANCELED";
                Order.updateOne({_id : order._id}, order, {new : true})
                    .then(result => res.status(201).json(order));
            }else{
                res.status(401).send();
            }
            
        })
        .catch(err => res.status(500).send());
}