const express = require("express");
const mongoose = require("mongoose")
const toDotasks = require('./schema/tasks')

const serverApp = express();
serverApp.use(express.json());

mongoose.connect("mongodb://localhost:27017/todo").then(() => console.log('Databse connected'));

serverApp.use('/', toDotasks);

serverApp.listen(9000, () => console.log("Server Connected"))