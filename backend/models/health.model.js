const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const healthSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    fullname: {
      type: String,
      required: true,
      trim: true,
    },
    temperature: {
      type: Number,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    phonenumber: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const HealthModel = mongoose.model("health", healthSchema);

module.exports = HealthModel;
