import React, { useEffect, useState, useContext } from 'react'
import { View, StyleSheet, Text, SafeAreaView, Pressable, FlatList, KeyboardAvoidingView, TextInput } from 'react-native'
import { AntDesign, Ionicons } from '@expo/vector-icons'
import Colors from '../Colors'
import ToDoContext from '../Context/ToDoContext';

export default function ListDetail({list, closeModal}) {
    const { addTasks, getLists, updateTasks } = useContext(ToDoContext)

    const [name, setName] = useState(list.name)
    const [color, setColor] = useState(list.color)
    const [id, setId] = useState(list.id)

    const [taskTitle, setTaskTitle] = useState('');

    const taskCount = list.tasks.length;
    const completedCount = list.tasks.reduce((count, task) => task.completed ? count + 1 : count, 0)
    
    const handleAddTask = () => {
        const newTask = { title: taskTitle, completed: false }; 
        addTasks(id, newTask); 
        setTaskTitle(''); 
    };

    const handleCheckTask = (taskId) => {
        updateTasks(id, taskId);
    };

    useEffect(() => {
        getLists(); 
    }, [list]);

    return (
        <SafeAreaView style={styles.container}>
            <Pressable style={styles.closeButton} onPress={closeModal}>
                <AntDesign name="close" size={24} color={Colors.black} />
            </Pressable>

            <View style={[styles.section, styles.header, {borderColor : color}]}>
                <View>
                    <Text style={styles.title}>{name}</Text>
                    <Text style={styles.taskCount}>
                        {completedCount} of {taskCount} tasks
                    </Text>
                </View>
            </View>

            <View style={[styles.section, {flex:3}]}>
            <FlatList
                data={list.tasks}
                renderItem={({item}) => (
                    <View style={styles.taskContainer}>
                        <Pressable onPress={() => handleCheckTask(item.id)}>
                        <AntDesign name={item.completed ? "checksquare" : "checksquareo"} size={24} color={Colors.gray} style={{ width: 32 }} />
                        </Pressable>
                        <Text style={[styles.task, {textDecorationLine: item.completed ? 'line-through' : 'none',color: item.completed ? Colors.gray : Colors.black}]}>{item.title}</Text>                    
                    </View>
                )}
                keyExtractor={(item) => item.id}
                contentContainerStyle = {styles.containersStyle}
                showsVerticalScrollIndicator={false}
            />
            </View>

            <KeyboardAvoidingView style={[styles.section, styles.footer]} behavior='padding'>
                <TextInput style={[styles.input, {borderColor: color}]} value={taskTitle} onChangeText={setTaskTitle}/>
                <Pressable style={[styles.addTask, {backgroundColor: color}]} onPress={handleAddTask}>
                    <AntDesign name='plus' size={16} color = {Colors.white} />
                </Pressable>
            </KeyboardAvoidingView>
            
        </SafeAreaView>
    )
    
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    closeButton:{
        position: 'absolute',
        top: 64,
        right: 32,
        zIndex: 10
    },
    section:{
        flex:1,
        alignSelf: "stretch"
    },
    header:{
        justifyContent: "flex-end",
        marginLeft: 64,
        borderBottomWidth: 3,
    },
    title:{
        fontSize:30,
        fontWeight: "800",
        color: Colors.black
    },
    taskCount:{
        marginTop:4,
        marginBottom: 16,
        color: Colors.gray,
        fontWeight: "600"
    },
    containersStyle:{
        paddingHorizontal:32,
        paddingVertical:64
    },
    footer:{
        paddingHorizontal:32,
        flexDirection: "row",
        alignItems: "center"
    },
    input:{
        flex: 1,
        height: 48,
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 6,
        marginRight: 8,
        paddingHorizontal: 8
    },
    addTask:{
        borderRadius:4,
        padding:16,
        alignItems:"center",
        justifyContent: "center"
    },
    taskContainer:{
        paddingVertical:16,
        flexDirection: "row",
        alignItems: "center"
    },
    task:{
        color : Colors.black,
        fontWeight: "700",
        fontSize:16
    }
})