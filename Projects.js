import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';

export default Projects = (props) => {
    const [projectStatus, setProjectStatus] = useState({'pressButton': false});

    const strikeoffProject = () =>{
        setProjectStatus({'pressButton':true})
    }

    return (  
        <View style={styles.taskContainer}>
            <TouchableOpacity onPress={() => strikeoffProject()}>
                {!projectStatus.pressButton && <MaterialIcons style={styles.strikeoff} name="panorama-fisheye" size={18} color='#fff' />}
                {projectStatus.pressButton && <MaterialIcons style={styles.strikeoff} name="radio-button-on" size={18} color='#fff' />}
            </TouchableOpacity>
            {!projectStatus.pressButton && <Text style={styles.project}>{props.project}</Text>}
            {projectStatus.pressButton && <Text style={styles.strikeofftask}>{props.project}</Text>}
            <TouchableOpacity onPress={() => props.removeProject()}>
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
    project: 
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