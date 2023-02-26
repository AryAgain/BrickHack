const { request, response } = require("express");
const mongoose = require("mongoose");
const router = require('express').Router();

const gpt3 = require('../ai_model.js');

const taskSchema = new mongoose.Schema({
    taskName: String,
    taskDescription: String,
    startDate : Date,
    endDate : Date,
    finalState : { type: Boolean, default: false }, // completed or not
    updated : { type: Date, default: Date.now }     //metadata
});

// Defining project schema
const projectSchema = new mongoose.Schema({
    projectName: String,
    taskName: Array,
    updated : { type: Date, default: Date.now }     //metadata
});

// Creating projects collection
const projects = mongoose.model("project", projectSchema);

const tasks = mongoose.model("task", taskSchema);
// const task1 = new tasks();
// task1.save();

async function createTask(taskName, taskDescription = null, startDate = null, endDate = null) {
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
});

async function deleteTask(request, response) {
    var query = {taskName: request.params.name};

    await tasks.deleteOne(query);
    // console.log(request.body);
    console.log("delete done in database");
    // response.status(200).json(request.body);
}

router.delete('/api/task/:name', (request, response) => {
    try{
        deleteTask(request, response);
    }catch(error){
        response.json(error);
        console.log("ERROR");
    }
});


// *** Projects fucntions ***
// function to create new project
async function createProject(projectName, noOftasks=3) {
    // calling gpt3 function to get task string
    taskString = await gpt3.runCompletion(noOftasks, projectName);
    
    // splitting task string into array of tasks
    taskArray = taskString.split(",");
    taskNames = []

    for(let i = 0; i < taskArray.length; i++){
        taskArray[i] = taskArray[i].trim();
        temp = taskArray[i].split(":");
        taskNames[i] = temp[1].trim();
        createTask(taskNames[i]);
    }

    console.log("created tasks for projects and saved to database");

    const project = new projects({
        projectName: projectName,
        taskName: taskNames,
    });
    project.save();
    // console.log(taskString);
    console.log("saved project to database");
}


// function to delete project from mongoose mongodb
async function deleteProject(request, response) {
//    await projects.deleteOne({ projectName: projectToDelete }, function (err) {
//         if (err)
//             console.log('error')
//         else
//             console.log("Successfully deleted")
//      });
    var query = {projectName: request.params.name};

    await projects.deleteOne(query);
    // console.log(request.body);
    console.log("delete done in project")
}

// express server to call createProject function
router.post('/createProject', function (req, res) {
    console.log('getting sent data=' + req.body);
    createProject(req.body.projectName);
    res.send('{"result":"sent"}');
});

// express server to call deleteProject function
router.delete('/deleteProject/:name', function (req, res) {
    console.log('getting sent data to be deleted=');
    deleteProject(req, res);
    res.send('{"result":"sent"}');
});

// function to get project
async function getAllProjects(response) {
    const allProjects = await projects.find({});
    console.log(allProjects);
    console.log("retreived from database");
    response.status(200).json(allProjects);
}

// express server to call getAllProjects function
router.get('/api/projects', (request, response) => {
    try{
        getAllProjects(response);
    }catch(error){
        response.json(error);
        console.log("ERROR");
    }
});

module.exports = router;
