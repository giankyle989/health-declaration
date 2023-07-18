const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
    },

    fullname: {
      type: String,
      required: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("users", userSchema);

module.exports = UserModel;
