const mongoose = require("mongoose");

const savedProductSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  productsSaved: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
      required: true,
    },
  ],
});

module.exports = mongoose.model("SavedProducts", savedProductSchema);
