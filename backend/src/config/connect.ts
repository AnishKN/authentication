const mongoose = require("mongoose");


export default function connect(){
  mongoose
    .connect(process.env.DB)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.log(err);
    });
};