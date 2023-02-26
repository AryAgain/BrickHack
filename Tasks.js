import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';

export default Tasks = (props) => {
    const [taskStatus, setTaskStatus] = useState({'pressButton': false});

    const strikeoffTask = () =>{
        setTaskStatus({'pressButton':true})
    }

    return (  
        <View style={styles.taskContainer}>
            <TouchableOpacity onPress={() => strikeoffTask()}>
                {!taskStatus.pressButton && <MaterialIcons style={styles.strikeoff} name="panorama-fisheye" size={18} color='#fff' />}
                {taskStatus.pressButton && <MaterialIcons style={styles.strikeoff} name="radio-button-on" size={18} color='#fff' />}
            </TouchableOpacity>
            {!taskStatus.pressButton && <Text style={styles.task}>{props.task}</Text>}
            {taskStatus.pressButton && <Text style={styles.strikeofftask}>{props.task}</Text>}
            <TouchableOpacity onPress={() => props.removeTask()}>
                <MaterialIcons style={styles.delete} name="delete" size={18} color='#fff' />
            </TouchableOpacity>
        </View>
    );
}


const styles = StyleSheet.create({
    taskContainer: {
        backgroundColor: '#3E3364',
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 5,
        minHeight: 50,
    },
    strikeoff: {
        marginLeft: 10
    },
    task: 
    {
        marginLeft: 40,
        textAlign: 'center',
        color: '#f0f8ff'
    },

    strikeofftask:
    {
        marginLeft: 40,
        textAlign: 'center',
        textDecorationLine: 'line-through',
        color: '#f0f8ff'
    },

    delete: {
        marginRight: 10
    }

});