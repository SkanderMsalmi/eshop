const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const fs = require("fs");
const RSA_PUB = fs.readFileSync("./rsa/key.pub");
const RSA_PRIVATE = fs.readFileSync("./rsa/key");

exports.connexion = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email }).exec();
    if (!user) {
      return res.status(401).json("Email not found");
    }

    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      if (user.blocked == true) {
        return res.status(401).json("You Are Banned !");
      }
      const token = jsonwebtoken.sign({}, RSA_PRIVATE, {
        subject: user._id.toString(),
        algorithm: "RS256",
        expiresIn: 60 * 60 * 60 * 30 * 6,
      });
      res.cookie("token", token, { httpOnly: true });
      return res.json(user);
    } else {
      return res.status(401).json("Incorrect password");
    }
  } catch (error) {
    console.log(error);
    return res
      .status(401)
      .json(
        "An error occurred while trying to authenticate. Please try again later."
      );
  }
};

exports.logout = (req, res, next) => {
  res.clearCookie("token");
  res.end();
};

exports.currentUser = async (req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    try {
      const decodedToken = jsonwebtoken.verify(token, RSA_PUB, {
        algorithms: ["RS256"],
      });
      if (decodedToken) {
        const user = await User.findById(decodedToken.sub)
          .select("-password -__v")
          .exec();
        if (user) {
          res.json(user);
        } else {
          res.json(null);
        }
      } else {
        res.json(null);
      }
    } catch (error) {
      console.log(error);
      res.json(null);
    }
  } else {
    res.json(null);
  }
};
