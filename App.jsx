import React from 'react';
import { ToDoProvider } from './Context/ToDoContext'; 
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, View } from 'react-native';
import Home from './Pages/Home'; 
import LogIn from './Pages/LogIn';
import SignUp from './Pages/SignUp';

const Stack = createStackNavigator();

export default function App() {
  return (
    <ToDoProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SignUp"> 
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="LogIn" component={LogIn} />
          <Stack.Screen name="SignUp" component={SignUp} />
        </Stack.Navigator>
      </NavigationContainer>
    </ToDoProvider>
  );
}