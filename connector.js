const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/dogsDB", {useNewUrlParser: true});

const dogSchema = new mongoose.Schema({
  name: String,
  age: Number,
  breed: String
 });

 const Dog = mongoose.model("Dog", dogSchema);
 const dog = new Dog({
  name: "Rex",
  age: 1,
  breed: "Golden Retriever"
 });
 dog.save();