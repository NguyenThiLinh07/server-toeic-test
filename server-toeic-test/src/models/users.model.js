const mongoose = require("mongoose");
const { toJSON } = require("./plugins");

const userSchema = new mongoose.Schema({
  displayName: {
    type: String,
    required: true,
    maxlength: 40,
    unique: true,
  },
  password: {
    type: String,
    minlength: 6,
  },
  email: {
    type: String,
    required: true,
    maxlength: 40,
    unique: true,
  },
  uid: {
    type: String,
    default: null,
  },
  photoUrl: {
    type: String,
    default: null,
  },
  isOnline: {
    type: Boolean,
    default: false,
  },
  lastActive: {
    type: Date,
    default: Date.now,
  },
});

userSchema.plugin(toJSON);

const User = mongoose.model("User", userSchema);
module.exports = User;
