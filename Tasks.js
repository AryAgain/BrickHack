import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';

export default Tasks = (props) => {
    // const [taskStatus, setTaskStatus] = useState({});

    return (  
        <View style={styles.taskContainer}>
            <TouchableOpacity onPress={() => props.strikeoffTask()}>
                <MaterialIcons style={styles.delete} name="panorama-fisheye" size={18} color='#fff' />
            </TouchableOpacity>
            <Text style={styles.task}>{props.task}</Text>
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
    delete: {
        marginLeft: 10
    },
});