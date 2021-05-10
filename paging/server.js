const express = require("express");
const mongoose = require("mongoose");
const User = require("./schema");
var bodyparser = require("body-parser");
const app = express();
app.use(express.json());
require("./db");
require("./schema");
// import User from "./schema";
app.listen(8000, () => {
  console.log("your server is up and runing");
});

app.post("/users/save", async (req, res) => {
  const { name, email } = req.body;
  const user = new User({ name, email });
  await user.save();
  res.status(201).json({ message: "User created succesfully" });
});

app.get("/api/users", async (req, res, next) => {
  try {
    let { page, size, select } = req.query;
    if (!page) {
      page = 1;
      // return;
    }
    if (!size) {
      size = 10;
      // return;
    }

    //  .select("name")
    //     .sort({ name: "asc" })

    const limit = parseInt(size);
    const skip = (page - 1) * size;
    const searchField = req.query.name;
    var myusers = await User.find(
      {
        name: { $regex: searchField },
      },
      { [select]: 1 }
    )
      .limit(limit)
      .skip(skip)

      .exec();
    // limit: limit,
    // skip: skip,
    // select: select,
    console.log(myusers);
    //const myusers = await User.find().limit(limit).size(skip);
    res.send(myusers);
  } catch (error) {
    res.sendStatus(500).send(error.message);
  }
});

// app.get("/search", (req, res, next) => {
//   const searchField = req.query.name;
//   User.find({ name: { $regex: searchField, $options: "$1" } }).then((data) => {
//     res.send(data);
//   });
// });
