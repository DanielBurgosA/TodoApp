import { StatusBar } from 'expo-status-bar';
import { FlatList, Modal, StyleSheet, Text, Pressable, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons'
import { useState, useContext, useEffect } from 'react';
import ToDoContext from '../Context/ToDoContext';

//------//
import Colors from '../Colors';
import List from '../Components/ListCard'
import AddList from '../Components/AddListModal';
import { useNavigation } from '@react-navigation/native';

export default function Home() {
  const navigation = useNavigation()
  const { toDoLists, getLists, logOut } = useContext(ToDoContext);

  const [addVisible, setAddVisible] = useState(false)

  const handleAdd = ()=>{
    setAddVisible(!addVisible)
  }

  const handleLogOut = async ()=>{
    await logOut
    navigation.navigate("LogIn")
  }

  useEffect(() => {
    getLists()
  },[])

  useEffect(() => {
    }, [toDoLists]);

  return (
    <View style={styles.container}>
      <Modal animationType='slide' visible={addVisible} onRequestClose={handleAdd}>
          <AddList closeModal={handleAdd} />
      </Modal>
      <Pressable onPress={handleLogOut}>
        <Text style={{color: Colors.blue, flexDirection: "row"}}>Log Out</Text>
      </Pressable>
      <View style={{ flexDirection: "row" }}>
          <View style = {styles.divider}/>
          <Text style = {styles.title}>
          ToDo <Text style={styles.secondText}> Lists </Text>
          </Text>
          <View style = {styles.divider}/>
      </View>

      <View style = {{marginVertical: 50}}>
          <Pressable style={styles.addList} onPress={handleAdd}>
          <AntDesign name='plus' size={30} color={Colors.blue} />
          </Pressable>
          <Text style={styles.add}>Add List</Text>
      </View>

      <View style={styles.list}>
          <FlatList 
          contentContainerStyle={styles.listContent}
          data={toDoLists} 
          keyExtractor={item => item.id} 
          horizontal={true} 
          showsHorizontalScrollIndicator={true}
          renderItem={({item})=> <List list={item}/> }/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider:{
    backgroundColor: Colors.ligthBlue,
    height: 1,
    flex: 1,
    alignSelf: "center"
  },
  title:{
    fontSize: 38,
    fontWeight: "800",
    color: Colors.black,
    paddingHorizontal: 64
  },
  secondText:{
    fontWeight: "300", 
    color: Colors.blue
  },
  addList:{
    borderWidth: 2,
    borderColor: Colors.ligthBlue,
    boderRadius: 10,
    padding: 16,
    alignItems: "center",
    justifyContent: "center"
  },
  add:{
    color: Colors.blue,
    fontWeight: "600",
    fontSize: 14,
    marginTop:8
  },
  list:{
    alignItems: 'center',
    justifyContent: 'center',
    height:257,
    paddingLeft: 32,
    maxWidth: 1000,
    overflowX: 'auto'
  },
  listContent: { 
    alignItems: 'flex-start', 
    paddingHorizontal: 16, 
  }
});
