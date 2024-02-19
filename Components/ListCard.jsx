import React, { useState, useContext } from 'react'
import { StyleSheet, Text, View, Pressable, Modal } from 'react-native'
import Colors from '../Colors'
import ListDetail from './ListDetailModal'
import ToDoContext from '../Context/ToDoContext';

export default function List({list}) {
    const { getTasks, deleteList} = useContext(ToDoContext)

    const[showList, setShowList] = useState(false)
    const completedCount = list.tasks.reduce((count, task) => task.completed ? count + 1 : count, 0)
    const remainingCount = list.tasks.reduce((count, task) => !task.completed ? count + 1 : count, 0)

    const handleShowList = ()=>{
        getTasks(list.id)
        setShowList(!showList)
    }

    const handleDelete = () => {
        deleteList(list.id);
    }

    return (
        <View>
            <Modal animationType='slide' visible={showList} onRequestClose={handleShowList}>
                <ListDetail list={list} closeModal={handleShowList} />
            </Modal>


            <Pressable style={[styles.listContainer, {backgroundColor: list.color}]} onPress={handleShowList}>
                <Pressable onPress={handleDelete} style={styles.deleteContainer} >
                    <Text style={styles.deleteText}> x </Text>
                </Pressable>

                <Text style = {styles.listTitle} numberOfLines={1}>
                    {list.name}
                </Text>

                <View>
                    <View style={styles.subtitles}>
                        <Text style={styles.count}>{completedCount}</Text>
                        <Text style={styles.subtitle}>Completed</Text>
                    </View>
                    <View style={styles.subtitles}>
                        <Text style={styles.count}>{remainingCount}</Text>
                        <Text style={styles.subtitle}>Remaining</Text>
                    </View>
                </View>
            </Pressable>
        </View>
    
    )
}

const styles = StyleSheet.create({
    listContainer:{
        paddingVertical:32,
        paddingHorizontal: 16,
        borderRadius:10,
        marginHorizontal: 12,
        alignItems: "center",
        width: 200
    },
    listTitle:{
        fontSize: 24,
        fontWeight: "700",
        color: Colors.white,
        marginBottom: 18,
        
    },
    subtitles:{
        margin:10,
        alignItems:'center'
    },
    count:{
        fontSize: 18,
        fontWeight: "200",
        color: Colors.white
    },
    subtitle:{
        fontSize: 12,
        fontWeight: "700",
        color: Colors.white
    },
    deleteText: {
        fontSize: 12,
        fontWeight: '700',
        color: Colors.white,
        marginRight: 8,
    },
    deleteContainer: {
        alignSelf: 'flex-end',
    },
})
