import React from 'react';
import { ToDoProvider } from './Context/ToDoContext'; 
import { StyleSheet, View } from 'react-native';
import Home from './Pages/Home'; 

export default function App() {
  return (
    <ToDoProvider>
      <View style={styles.container}>
        <Home />
      </View>
    </ToDoProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    overflowY: 'auto',
    height: '100vh', 
  },
});