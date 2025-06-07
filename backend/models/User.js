const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: [/.+\@.+\..+/, "Please enter a valid email address"],
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  role: {
    type: String,
    enum: ["customer", "admin"], // enum restrict the user to enter any other value like If someone tries to save role: "manager", Mongoose will throw a validation error because "manager" is not in the enum list.
    default: "customer",
  }
},
  { timestamps: true } // Adds createdAt and updatedAt fields to each document automatically.
);

// Password hash middleware
// After the user enter password in the form before saving the password in database we need to encrypt it
// we will store hash password in the database
// pre("save"): A Mongoose middleware that runs before saving a document to the DB.
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10); //Salt is a random string added to the password before hashing.
  // let say if 2 user set same password then salt make them different by adding different salt string.
  this.password = await bcrypt.hash(this.password, salt);
  next();
});


// Match user's entered password (at time of login) to hashed passsword
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
