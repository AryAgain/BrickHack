const express = require("express");
const mongoose = require("mongoose")
const toDotasks = require('./schema/tasks')
var bodyParser = require('body-parser');
var cors = require('cors');

const serverApp = express();
serverApp.use(bodyParser.json());
serverApp.use(bodyParser.urlencoded({ extended: true }));

serverApp.use(cors());
serverApp.use(express.json());

mongoose.connect("mongodb://localhost:27017/todo").then(() => console.log('Database ToDo connected'));

// mongoose.connect("mongodb://localhost:27017/project").then(() => console.log('Database Project connected'));

serverApp.use('/', toDotasks);

serverApp.listen(8100, () => console.log("Server Connected"))