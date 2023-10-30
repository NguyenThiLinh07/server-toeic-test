const mongoose = require("mongoose");

const connect = async () => {
  await mongoose
    .connect(
      "mongodb+srv://duythanh:uWFapMuRAeVu9SM1@cluster0.i29qzvv.mongodb.net/?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        wtimeoutMS: 10000,
      }
    )
    .then(() => console.log("Connect DB success"))
    .catch((e) => console.log(e))
    .finally(() => {});
};

module.exports = connect;
