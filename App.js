import React, {useState,useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { Keyboard, ScrollView, StyleSheet, Text, View } from 'react-native';
import TaskEnter from './TaskEnter';
import Tasks from './Tasks';

export default function App() {

  const [tasks, setTasks] = useState([]);

  const addTask = (task) => {
    if (task == null) return;
    // setTasks([...tasks, task]);
    
    fetch('http://localhost:3000/createTask', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ taskName: task })
            }).then(response => setTasks([...tasks, task]));

    Keyboard.dismiss();
  }

  const removeTask = (removeTaskValue) => {


    fetch('http://localhost:3000/deleteTask', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ taskName: removeTaskValue })
            }).then(response => setTasks(tasks.filter((value) => value != removeTaskValue)));

  }

  // componentDidMount=()=>{
  
  //   // Changing the state after 2 sec
  //   // from the time when the component
  //   // is rendered
  //   setTimeout(() => {
  //     this.setState({ color: 'wheat' });
  //   }, 1000);
  // }

  useEffect(() => {
    
    fetch('http://localhost:3000/api/tasks', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
      })
      .then((response) => response.json())
      .then((responseJson) => {
        //  console.log(responseJson);
        //  setState({
        //     data: responseJson
        //  })
        var temp = []
        for(var i=0;i<responseJson.length;i++){
            temp.push(responseJson[i].taskName)
        }

        setTasks(temp)

      })
      .catch((error) => {
         console.error(error);
      });

  });

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>TODO NOW LIST</Text>
      <ScrollView style={styles.scrollView}>
        {
        tasks.map((task, index) => {
          return (
            <View key={index} style={styles.taskContainer}>
              <Tasks task={task} removeTask={() => removeTask(task)}/>
            </View>
          );
        })
      }
      </ScrollView>
      <TaskEnter addTask={addTask}/>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1A3C',
  },
  heading: {
    color: '#f0f8ff',
    fontSize: 35,
    fontWeight: '600',
    marginTop: 50,
    marginBottom: 10,
    textAlign: 'center'
  },
  scrollView: {
    marginBottom: 70,
  },
  taskContainer: {
    marginTop: 20,
  }
});