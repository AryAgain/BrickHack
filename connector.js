var express = require('express');
const mongoose = require("mongoose");
var bodyParser = require('body-parser');
var cors = require('cors');
const gpt3 = require('./ai_model.js');

var server = express();

mongoose.connect("mongodb://localhost:27017/todo", function(err){
    if(err){
        console.log("Error connecting to database");
    }else{
        console.log("Connected to database");
    }

});
// express server to listen to port 3200
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.use(cors());

server.listen(3200, function () {
    console.log('Server is running..');
});
// express server to call createTask function
server.post('/createTask', function (req, res) {
    console.log('getting sent data=',req.body);
    //createTask(req.body.taskName, req.body.taskDescription, req.body.startDate, req.body.endDate);
    createTask(req.body.taskName,req.body.endDate);
        // "hi", "2023-05-25T16:34", "2023-06-25T16:34");
    res.send('{"result":"sent"}');
});

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

// const task1 = new tasks({
//     taskName: "Do grocery",
//     taskDescription: "Buy milk, bread, eggs, and fruits",
//     startDate : new Date("2023-05-25T12:34"),
//     endDate : new Date("2023-05-28T12:34"),
// });

// task1.save();

// give console output of done
// console.log("saved to database");

// function to create new task
function createTask(taskName, endDate=null, taskDescription=null, startDate=null) {
    console.log('in createtask()=',taskName, endDate)
    const task = new tasks({
        taskName: taskName,
        taskDescription: taskDescription,
        startDate : startDate,
        endDate : endDate,
    });
    task.save();
    console.log("saved to database");
}


// function to delete task from mongoose mongodb
function deleteTask(task) {
    // await tasks.deleteOne({ taskName: task }, function (err) {
    //     if (err) return handleError(err);
    //     // deleted at most one tank document
    //  });

// Using callbacks:
     tasks.deleteOne({ taskName: task }, function (err) {
            if (err)
                console.log('error')
            else
                console.log("Successfully deleted")
         });
}
// express server to call deleteTask function
server.post('/deleteTask', function (req, res) {
    console.log('getting sent data to be deleted=',req.body);
    deleteTask(req.body.taskName);
    res.send('{"result":"sent"}');
});



async function getAllTasks(response) {
    const allTasks = await tasks.find({});
    // for (let i = 0; i < allTasks.length; i++) {
    //     console.log(allTasks[i]);
    // }
    // console.log(allTasks);
    // console.log("retreived from database");
    response.status(200).json(allTasks);
}

server.get('/api/tasks', (request, response) => {
    try{
        getAllTasks(response);
    }catch(error){
        response.json(error);
        console.log("ERROR");
    }
})

// call createTask function
// createTask("Get milk ", "Buy organic", new Date("2023-05-25T12:34"), new Date("2023-05-29T12:34"));


// function to update task
// findOneAndUpdate()
//function updateTask(taskName, taskDescription, startDate, endDate) {




// Defining project schema
const projectSchema = new mongoose.Schema({
    projectName: String,
    taskName: Array,
    updated : { type: Date, default: Date.now }     //metadata
});

// Creating projects collection
const projects = mongoose.model("project", projectSchema);




// *** Projects fucntions ***
// function to create new project
async function createProject(projectName, noOftasks=3) {
    // calling gpt3 function to get task string
    taskString = await gpt3.runCompletion(noOftasks, projectName);
    console.log('projectName in cp()=',projectName)
    console.log('test in cp()')
    // splitting task string into array of tasks
    console.log(taskString);
    taskArray = taskString.split(",");

    for(let i = 0; i < taskArray.length; i++){
        console.log("task array of i" +i + "- "+ taskArray[i]);
        temp = taskArray[i].trim().split(":");
        console.log("temp" +temp);
        
        // temp = taskArray[i].split(":");
        // taskNames[i] = temp[1].trim();
        createTask(temp[1]);
        console.log(temp);
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
    // var query = {projectName: request.params.name};

    await projects.deleteOne(request.body);
    // console.log(request.body);
    console.log("delete done in project")
}

// express server to call createProject function
server.post('/createProject', function (req, res) {
    console.log('in here')
    console.log('getting sent data in create p api=' + req.body.projectName);
    createProject(req.body.projectName);
    res.send('{"result":"sent"}');
});

// express server to call deleteProject function
server.delete('/deleteProject', function (req, res) {
    console.log('getting sent data to be deleted=');
    deleteProject(req, res);
    res.send('{"result":"sent"}');
});