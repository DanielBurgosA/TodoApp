import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import tempData from '../tempData';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const ToDoContext = createContext();

export const ToDoProvider = ({ children }) => {
  const [toDoLists, setToDoLists] = useState();
  const [tasks, setTasks] = useState([]);
  const [token, setToken] = useState(null);

  const API_URL = 'http://localhost:5000/api/'

  const fetchToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        const decoded = jwtDecode(token,"uH8t5Rv2Yw5L1zPeG8r3S0v5Ys8K3hNdF6TmYq3Bw6EsG9k1CvUq4Zs7Xm9QrYt");
        return decoded
      }
    } catch (error) {
      console.error('Error fetching token:', error);
    }
  }

  const saveToken = async (token) => {
    try {
      await AsyncStorage.setItem('token', token);
    } catch (error) {
      console.error('Error saving token:', error);
    }
  };

  const getUserIdFromToken = () => {
    try {
      const payload = token.split('.')[1];
      const decodedPayload = atob(payload);
      const { userId } = JSON.parse(decodedPayload);
      return userId;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  };

  const login = async (userData) => {
    try {
      const response = await axios.post(`${API_URL}auth/login`, userData);
      const token = response.data;
      await AsyncStorage.setItem('token', token);
      await console.log(await fetchToken())
      return true
    } catch (error) {
      throw error.response.data;
    }
  };

  const signUp = async (userData) => {
    try {
      const response = await axios.post(`${API_URL}auth/register`, userData);
      const token = response.data;
      await AsyncStorage.setItem('token', token);
      return true;
    } catch (error) {
      throw error.response.data;
    }
  };

  const getLists = () => {
    setToDoLists([...tempData]);
  };

  const createList = (newList) => {
    tempData.push(newList)
    setToDoLists([...toDoLists]);
  };

  const getTasks = (id) =>{
    const list = toDoLists.find(l=>l.id===id)
    setTasks([...list.tasks])
  }

  const updateTasks = (idlist, idtask) =>{
    tempData.find(l=>l.id===idlist).tasks.find(t=>t.id===idtask).completed= !tempData.find(l=>l.id===idlist).tasks.find(t=>t.id===idtask).completed
    getLists()
  }

  const addTasks = (id, t) =>{
    tempData.find(l=>l.id===id).tasks.push(t)
    getLists();
  }

  useEffect(()=>{
    getLists();
}, [])

  const value = {
    login,
    signUp,

    toDoLists,
    createList,
    getLists,
    

    getTasks,
    addTasks,
    tasks,
    updateTasks
  }

  return (
    <ToDoContext.Provider value={ value }>
      {children}
    </ToDoContext.Provider>
  );
};

export default ToDoContext;