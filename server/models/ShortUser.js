const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const shortUserSchema = new Schema({
  _id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  reputation: {
    type: Number,
    required: true,
  },
  picture: {
    type: String,
  },
  status: {
    type: String,
  },
});
module.exports.shortUserSchema = shortUserSchema;
