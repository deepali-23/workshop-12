const mongoose = require("mongoose");

//setting up the connection to the database
mongoose
  .connect(
    "mongodb+srv://new123:new123@cluster0.wyqhk.mongodb.net/paging?retryWrites=true&w=majority",
    { useNewUrlParser: true },
    { useUnifiedTopology: true }
  )
  .then(() => console.log("database connection succesful"))
  .catch((err) => console.log(err));
