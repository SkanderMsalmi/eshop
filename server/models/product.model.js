const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    productId: {
        type: Number,
        required : true
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true,
    },
    color:[
      {
        type : String,
        required : true
    }
    ],
    size:[
      {
        type : String,
        required : true
    }
    ],
    material:{
        type : String,
        required : true
    },
    category: {
      type: String,
      enum: ["MAN", "WOMAN", "KID"],
      required : true
    },
    quantity :{
        type : Number,
        required : true
    },
    image : [
      {
        type : String,
        required: true
      }
    ],
    reviews : [
      {
        score : {
          type : Number,
          required : true
        },
        body : {
          type : String,
          required : true
      },
      userId : {
        type : Schema.Types.ObjectId,
        required : true,
        ref: 'user'
      },
      date : {
        type : Date,
        required: true
      }
    }
    ]
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("product", ProductSchema);
