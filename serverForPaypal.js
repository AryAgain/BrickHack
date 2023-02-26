const express = require("express");
// const mongoose = require("mongoose")
// const toDotasks = require('./schema/tasks')

const routerPaypal = require('./paypalTask.js')

const ejs = require('ejs') // for basic UI, can remove later and related commands

const serverApp = express();
serverApp.use(express.json());

// mongoose.connect("mongodb://localhost:27017/todo").then(() => console.log('Databse connected'));
// serverApp.use('/', toDotasks);

serverApp.get('/', (request, response) => response.render('basicDisplay.ejs'));

serverApp.use('/payment', routerPaypal);
serverApp.use('/success', routerPaypal);
serverApp.get('/cancel',(request, response) => response.send("PAYMENT CANCELLED"))
serverApp.listen(8100, () => console.log("Server Connected"))