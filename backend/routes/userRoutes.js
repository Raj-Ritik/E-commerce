const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken")
const { protect } = require("../middleware/authMiddleware")
const router = express.Router();


//@route POST /api/users/register
//@description Register a new user
//@access Public
router.post("/register", async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // Registration Logic
    let user = await User.findOne({ email });
    //check if user already exist
    if (user) return res.status(400).json({ message: "User already exists" });
    // for new users
    user = new User({ name, email, password, role });
    await user.save(); // saving user info in database

    // create JWT Payload
    const payload = { user: { id: user._id, role: user.role } };

    // sign and return the token along with user data
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" }, (err, token) => {
      if (err) throw err;

      //send the user and token in response
      res.status(201).json({
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        token, // later this token is used to authorize a user 
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});


//@route POST /api/user/login
//@description Authenticate User
//@access Public
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    let user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: "Invalid Credentials" });
    const isMatch = await user.matchPassword(password);
    // check password entered is correct or not
    if (!isMatch) return res.status(400).json({ message: "Invalid Credentials" })
    // create JWT Payload
    const payload = { user: { id: user._id, role: user.role } };

    // sign and return the token along with user data
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" }, (err, token) => {
      if (err) throw err;

      //send the user and token in response
      res.json({
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        token, // later this token is used to authorize a user 
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});


//@route GET /api/users/profile
//@description Get logged-in user's profile (Protected Route) 
// we need to create a middleware to protect this request
//@access PRIVATE
router.get("/profile", protect, async (req, res) => {
  res.json(req.user);
})

module.exports = router