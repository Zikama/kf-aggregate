const mongoose = require("mongoose"),
  db = require("./keys").mongoURI,
  // Connect to mongodb
  conn = () =>
    mongoose
      .connect(db, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      })
      .then((e) => {
        // e.connections[0].dropDatabase(err => { if (err) throw err; });
        console.log("mongoDB connected...");
        return e;
      }).catch(error=>console.log(error));

module.exports = conn;