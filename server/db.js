const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://khalilrebhi:e8phhxn5JIC69k1R@cluster0.uzgjz.mongodb.net/pfe",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB database!");
});
