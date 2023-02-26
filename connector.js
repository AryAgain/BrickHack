const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/todo", {useNewUrlParser: true});

// Defining task schema
const taskSchema = new mongoose.Schema({
    taskName: String,
    taskDescription: String,
    startDate : Date,
    endDate : Date,
    state : { type: Boolean, default: false },
    updated : { type: Date, default: Date.now }     //metadata
});

// Creating collection
const tasks = mongoose.model("task", taskSchema);

const task1 = new tasks({
    taskName: "Do grocery",
    taskDescription: "Buy milk, bread, eggs, and fruits",
    startDate : new Date("2023-05-25T12:34"),
    endDate : new Date("2023-05-28T12:34"),
});

task1.save();

// give console output of done
console.log("saved to database");

// function to create new task
function createTask(taskName, taskDescription, startDate, endDate) {
    const task = new tasks({
        taskName: taskName,
        taskDescription: taskDescription,
        startDate : startDate,
        endDate : endDate,
    });
    task.save();
    console.log("saved to database");
}

// call createTask function
createTask("Get milk ", "Buy organic", new Date("2023-05-25T12:34"), new Date("2023-05-29T12:34"));


// function to update task
// findOneAndUpdate()
//function updateTask(taskName, taskDescription, startDate, endDate) {

