import React, { useContext, useState } from 'react'
import { View, StyleSheet, Text, KeyboardAvoidingView, Pressable, TextInput } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import Colors from '../Colors'
import ToDoContext from '../Context/ToDoContext';

export default function AddList({ closeModal }) {
  const { toDoLists, createList, getLists} = useContext(ToDoContext)
  const colorsArray = ["#2455D9",  "#24D94E", "#D92424", "#D9D424", "#9424D9", "#D97E24"]

  const [name, setName] = useState("")
  const [color, setColor] = useState(colorsArray[0])
  const [isNameEmpty, setIsNameEmpty] = useState(false)

  const handleNameChange = (text) =>{
      setName(text)
      setIsNameEmpty(false)
  }

  const handleColorChange = (color) =>{
      setColor(color)
  }



  const handleCreateList = () =>{
      if (name.trim() === "") {
          setIsNameEmpty(true)
          return;
      }

      createList({name, color, tasks:[], id:(toDoLists.length+1)})
      setName("")
      getLists()
      closeModal()
  }

  return (
      <KeyboardAvoidingView style={styles.container} behavior='padding'>
          <Pressable style ={styles.closeButton} onPress={closeModal}>
              <AntDesign name="close" size={24} color={Colors.black} />
          </Pressable>

          <View style ={styles.form}>
              <Text style={styles.title}>Create new list</Text>
              <TextInput 
                  style={[styles.input, isNameEmpty && styles.inputError]} 
                  placeholder='List Name' 
                  onChangeText={handleNameChange} 
                  value={name} 
              />
              
              {isNameEmpty && <Text style={styles.errorMessage}>Title is required</Text>}
  
              <View style={styles.colorContainer}>{
                  colorsArray.map(c=>{
                      return (
                          <Pressable key={c} value={c} style={[styles.colorSelector, {backgroundColor: c}]} onPress={() => handleColorChange(c)} />
                      )
                  })
              }</View>

              <Pressable style={[styles.create, {backgroundColor:color} ]} onPress={handleCreateList}>
                  <Text style={styles.createText}>Create!</Text>
              </Pressable>
          </View>
      </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  closeButton:{
    position: "absolute",
    top: 64,
    right: 32
  },
  form:{
    alignSelf: "stretch",
    marginHorizontal:32,
    maxWidth:800,
  },
  title:{
    fontSize: 28,
    fontWeight: "800",
    color: Colors.black,
    alignSelf: "center",
    marginBottom: 16
  },
  input:{
    borderWidth: 2,
    borderColor: Colors.blue,
    borderRadius: 6,
    height: 50,
    marginTop: 8,
    paddingHorizontal: 16,
    fontSize: 18,
  },
  inputError: {
    borderColor: 'red',
    borderWidth: 3, // Ajustar el grosor del borde en el estado de error
  },
  errorMessage: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 8,
  },
  create:{
    marginTop:24,
    height: 50,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  createText:{
    color: Colors.white,
    fontWeight: "600"

  },
  colorContainer:{
    flexDirection:"row",
    justifyContent: "space-between",
    marginTop: 12
  },
  colorSelector:{
    width: 30,
    height: 30,
    borderRadius: 6,
  }
})