import React, {useState,useEffect} from 'react';
import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { Keyboard, ScrollView, StyleSheet, Text, View } from 'react-native';
import TaskEnter from './TaskEnter';
import Tasks from './Tasks';
import { MaterialIcons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

export default function TaskPage({navigation}) {

  const [tasks, setTasks] = useState([]);

  const addTask = (taskobject) => {
    if (taskobject.taskName == null) return;
    // setTasks([...tasks, task]);
    console.log('in addtask()=',taskobject)
    // http://localhost:3200/createTask  // use  "ipconfig getifaddr en0" to find ip
    fetch('http://129.21.66.106:3200/createTask', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ taskName: taskobject.taskName, endDate: taskobject.datetime  })
            }).then(response => setTasks([...tasks, taskobject.taskName]));

    Keyboard.dismiss();
  }

  const removeTask = (removeTaskValue) => {

    // http://localhost:3200/deleteTask
    fetch('http://129.21.66.106:3200/deleteTask', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ taskName: removeTaskValue })
            }).then(response => setTasks(tasks.filter((value) => value != removeTaskValue)));

  }


  useEffect(() => {
    
    // http://localhost:3200//api/tasks
    fetch('http://129.21.66.106:3200/api/tasks', {
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
      <Text style={styles.heading}>Good Morning</Text>
      <View style={styles.projectcontainer}>
        <MaterialIcons style={styles.projecticon} onPress={() => navigation.navigate('Project')} name="radio-button-on" size={18} color='#fff' />
      </View>
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
    fontSize: 25,
    fontWeight: '600',
    marginTop: 60,
    marginBottom: 10,
    marginLeft: 20,
    textAlign: 'left'
  },
  projectcontainer: {
    backgroundColor: '#1E1A3C',
    justifyContent: 'right',
    paddingHorizontal: 10,
    paddingVertical: 5,
    minHeight: 10,
  },
  projecticon: {
    marginRight: 10,
    marginLeft: 340
  },
  scrollView: {
    marginBottom: 70,
  },
  taskContainer: {
    marginTop: 20,
  }
});