import React, {useState} from 'react';
import { KeyboardAvoidingView, StyleSheet, View, TextInput, TouchableOpacity, } from "react-native";
import { MaterialIcons } from '@expo/vector-icons'; 
import DateTimePicker from '@react-native-community/datetimepicker';

export default TaskEnter = (props) => {
    const [task, setTask] = useState();
    const [date, setDate] = useState(new Date());

    const handleAddTask = (value) => {
        props.addTask(value);
        setTask(null);
    }

    const onChangedate = (event, selectedDate) => {
        // setShowDate(false);

        // on cancel set date value to previous date
        if (event?.type === 'dismissed') {
            setDate(date);
            return;
        }
        console.log(selectedDate)
        setDate(selectedDate);
    };

    return (
        <KeyboardAvoidingView 
        // behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}>
        <TextInput style={styles.inputField} value={task} onChangeText={text => setTask(text)} placeholder={'Write a task'} placeholderTextColor={'#fff'}/>
        <DateTimePicker style={styles.datetimeField}
                    testID="dateTimePicker"
                    value={date}
                    mode="datetime" 
                    is24Hour={true}
                    onChange={onChangedate} />
        <TouchableOpacity onPress={() => handleAddTask(task)}>
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
        marginLeft: 80,
        fontSize:40
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