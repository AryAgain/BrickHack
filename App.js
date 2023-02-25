import React, {useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { Keyboard, ScrollView, StyleSheet, Text, View } from 'react-native';
import TaskEnter from './TaskEnter';
import Tasks from './Tasks';

export default function App() {

  const [tasks, setTasks] = useState([]);

  const addTask = (task) => {
    if (task == null) return;
    setTasks([...tasks, task]);
    Keyboard.dismiss();
  }

  const strikeoffTask = (strikeoffValue) => {
    setTasks(tasks.filter((value) => value != strikeoffValue));
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>TODO NOW LIST</Text>
      <ScrollView contentContainerStyle={{flexGrow:1}} style={styles.scrollView}>
        {
        tasks.map((task, index) => {
          return (
            <View key={index} style={styles.taskContainer}>
              <Tasks task={task} strikeoffTask={() => strikeoffTask(task)}/>
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 80,
  },
  text: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    fontSize: 20
  },
  scrollView: {
    marginBottom: 70,
    flexGrow: 1
  }
});
