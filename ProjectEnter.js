import React, {useState} from 'react';
import { KeyboardAvoidingView, StyleSheet, View, TextInput, TouchableOpacity, } from "react-native";
import { MaterialIcons } from '@expo/vector-icons'; 
import DateTimePicker from '@react-native-community/datetimepicker';

export default ProjectEnter = (props) => {
    const [project, setProject] = useState();

    const handleAddProject = (value) => {
        props.addProject(value);
        setProject(null);
    }

    return (
        <KeyboardAvoidingView 
        // behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}>
        <TextInput style={styles.inputField} value={project} onChangeText={text => setProject(text)} placeholder={'Write a project'} placeholderTextColor={'#fff'}/>
        <TouchableOpacity onPress={() => handleAddProject({"projectName":project})}>
          <View style={styles.button}>
              <MaterialIcons name="keyboard-arrow-up" size={24} color="black" />
          </View>
        </TouchableOpacity>

       
      </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        borderColor: '#fff',
        backgroundColor: '#3E3364',
        borderWidth: 1,
        marginHorizontal: 20,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        position: 'absolute',
        bottom: 20,
    },
    inputField: {
        color: '#fff',
        height: 50,
        flex: 1,
    },
    datetimeField:{
        // marginLeft: 120
        justifyContent: 'right',
        // ,
        // fontSize:40
    },
    button: {
        height: 30,
        width: 30,
        borderRadius: 5,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
});