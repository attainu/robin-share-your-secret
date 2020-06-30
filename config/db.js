const mongoose = require("mongoose");

exports.db = mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost/secret_DB", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("db connected"))
  .catch((err) => console.log(err));
