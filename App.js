import 'react-native-gesture-handler';
import React, {useState,useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { Keyboard, ScrollView, StyleSheet, Text, View } from 'react-native';
import TaskEnter from './TaskEnter';
import Tasks from './Tasks';
import { MaterialIcons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TaskPage from './TaskPage';
import ProjectHomePage from './ProjectHomePage';


const Stack = createStackNavigator();

export default function App() {



  return (
    
  
    <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Task"
            component={TaskPage}
          />
          <Stack.Screen
            name="Project"
            component={ProjectHomePage}
          />
        </Stack.Navigator>
      </NavigationContainer>
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