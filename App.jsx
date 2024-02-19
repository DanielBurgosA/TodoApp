import React, { useEffect, useState } from 'react';
import { ToDoProvider } from './Context/ToDoContext'; 
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import Home from './Pages/Home'; 
import LogIn from './Pages/LogIn';
import SignUp from './Pages/SignUp';
import SessionExpired from './Pages/SessionExpired';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

export default function App() {
  const [isTokenValid, setIsTokenValid] = useState(null);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        setIsTokenValid(!!token);
      } catch (error) {
        console.log('Error al obtener el token:', error);

      }
    };

    checkToken();
  }, []);

  if (isTokenValid === null) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ToDoProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={isTokenValid ? 'Home' : 'LogIn'}> 
          {isTokenValid?<Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>:
          <Stack.Screen name="SessionExpired" component={SessionExpired} options={{ headerShown: false }}/>}
          <Stack.Screen name="LogIn" component={LogIn} options={{ headerShown: false }}/>
          <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }}/>
        </Stack.Navigator>
      </NavigationContainer>
    </ToDoProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});