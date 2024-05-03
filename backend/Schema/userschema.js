const mongoose = require("mongoose");

const userschema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
  Mobile: {
    type: Number,
    required: true,
  },
  Password: {
    type: String,
    required: true,
  },
  Usertasks: [
    {
      task: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

module.exports = mongoose.model("userdata", userschema);
