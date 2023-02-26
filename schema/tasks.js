const { request, response } = require("express");
const mongoose = require("mongoose");
const router = require('express').Router();

const taskSchema = new mongoose.Schema({
    taskName: String,
    taskDescription: String,
    startDate : Date,
    endDate : Date,
    finalState : { type: Boolean, default: false }, // completed or not
    updated : { type: Date, default: Date.now }     //metadata
});

const tasks = mongoose.model("task", taskSchema);
// const task1 = new tasks();
// task1.save();

async function createTask(taskName, taskDescription, startDate, endDate) {
    const task = new tasks({
        taskName: taskName,
        taskDescription: taskDescription,
        startDate : new Date(startDate),
        endDate : new Date(endDate),
    });
    await task.save();
    console.log("saved to database");
}

router.post('/api/task', (request, response) => {
    try{
        createTask(
            request.body.taskName,
            request.body.taskDescription,
            request.body.startDate,
            request.body.endDate,
            request.body.state,
            request.body.updated,
        )
    }catch(error){
        response.json(error);
        console.log("ERROR");
    }
})

async function getAllTasks(response) {
    const allTasks = await tasks.find({});
    // for (let i = 0; i < allTasks.length; i++) {
    //     console.log(allTasks[i]);
    // }
    console.log(allTasks);
    console.log("retreived from database");
    response.status(200).json(allTasks);
}

router.get('/api/tasks', (request, response) => {
    try{
        getAllTasks(response);
    }catch(error){
        response.json(error);
        console.log("ERROR");
    }
})

async function updateTask(request, response) {
    var query = {taskName: request.params.name};
    var updTasks = {$set: request.body};
    await tasks.updateOne(query, updTasks);
    console.log(request.body);
    console.log("update done in database")
    response.status(200).json(request.body);
}

router.put('/api/task/:name', (request, response) => {
    try{
        updateTask(request, response);
    }catch(error){
        response.json(error);
        console.log("ERROR");
    }
})

module.exports = router;
