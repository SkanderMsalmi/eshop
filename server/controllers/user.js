const User = require("../models/user.model");
const bcrypt = require("bcrypt");

exports.register = async (req, res, next) => {
  if (User.find({ email: req.body.email })) {
    return res.status(409).json("Email exists already");
  }
  const newUser = new User({
    email: req.body.email,
    name: req.body.name,
    password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8)),
    role: "CUSTOMER",
  });
  try {
    await newUser.save();
    return res.status(200).json(newUser);
  } catch (error) {
    return res
      .status(403)
      .json(
        " An error occurred while trying to signup. Please try again later."
      );
  }
};

exports.getAllUsers = (req, res, next) => {
  User.find()
    .then((users) => {
      if (users.length > 0) {
        res.status(200).json(users);
      } else {
        res.status(404).json("no users found!");
      }
    })
    .catch((err) => res.status(500).send());
};
