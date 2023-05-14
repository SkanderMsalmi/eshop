const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    orderId : {
        type : Number,
        required : true
    },
    date : {
        type : Date,
        required : true
    },
    products : [
        {
            product : {
                type : mongoose.Schema.Types.ObjectId,
                required : true,
                ref : "product"
            },
            quantity : {
                type : Number,
                required : true
            }
        }
    ],
    status : {
        type : String,
        enum : ["PENDING","DELIVERED","CANCELED"],
        default : "PENDING"
    },
    totalAmount :{
        type : Number,
        required : true
    },
    shippingInfo :{
        type : String,
        required: true
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user',
        required : true
    }
},
{
    timestamps :true
});

module.exports = mongoose.model('order', OrderSchema);
