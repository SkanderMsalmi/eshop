const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "./public/images",
  filename: function (req, file, callback) {
    callback(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// Init upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // 1 MB
  fileFilter: function (req, file, callback) {
    checkFileType(file, callback);
  },
}).single("image");

// Check file type
function checkFileType(file, callback) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return callback(null, true);
  } else {
    return callback("Error: Images only!");
  }
}

exports.uploadProfileImage = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const image = req.file;

    if (!image || !image.mimetype.startsWith("image/")) {
      return res.status(400).json({
        message: "Please upload a valid image file",
      });
    }

    user.profileImage = {
      data: fs.readFileSync(image.path),
      contentType: image.mimetype,
    };

    await user.save();

    res.status(200).json({
      message: "Profile image uploaded successfully",
    });
  } catch (err) {
    next(err);
  }
};

exports.register = async (req, res, next) => {
  if (await User.find({ email: req.body.email })) {
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
exports.updateUser = async (req, res, next) => {
  const user = await User.findById(req.body.id);
  if (!user) {
    return res.status(404).json("User not found");
  } else if (user) {
    const { id, email } = req.body;
    const userWithSameEmail = await User.findOne({ email });
    if (userWithSameEmail && userWithSameEmail._id != id) {
      return res.status(409).json("Email is already taken.");
    } else {
      const updatedUser = await User.findByIdAndUpdate(
        id,
        {
          name: req.body.name,
          email: req.body.email,
          number: req.body.number,
          dateOfBirth: req.body.dateOfBirth,
          gender: req.body.gender,
          occupation: req.body.occupation,
        },
        { new: true }
      );
      return res.status(200).json(updatedUser);
    }
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
