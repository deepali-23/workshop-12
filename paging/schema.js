const mongoose = require("mongoose");

const myschema = mongoose.Schema({
  name: {
    type: "String",
    required: "true",
  },
  email: {
    type: "String",
    required: "true",
  },
});

const User = mongoose.model("paging", myschema);
module.exports = User;
