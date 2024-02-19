import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import tempData from '../tempData';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const ToDoContext = createContext();

export const ToDoProvider = ({ children }) => {
  const [toDoLists, setToDoLists] = useState();
  const [tasks, setTasks] = useState([]);
  const [isSessionExpired, setIsSessionExpired] = useState(false);

  const API_URL = 'http://localhost:5000/api/'

  const handleApiError = (error) => {
    if (error.response && (error.response.status === 401 || error.response.status === 404)) {
      setIsSessionExpired(true);
    } else {
      console.error('Error en la llamada a la API:', error);
    }
  };

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

  const getLists = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.get(`${API_URL}todoList`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      setToDoLists(response.data);
    } catch (error) {
      console.log('Error fetching todo lists:', error);
    }
  };

  const login = async (userData) => {
    try {
      const response = await axios.post(`${API_URL}auth/login`, userData);
      const token = response.data;
      await AsyncStorage.setItem('token', token);
      getLists()
      return "Welcome back"
    } catch (error) {
      throw new Error (error.response.data);
    }
  };

  const logOut = async () => {
    try {
      await AsyncStorage.removeItem('token');
      localStorage.removeItem('token')
      setToDoLists(null);
      setTasks([]);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  const signUp = async (userData) => {
    try {
      const response = await axios.post(`${API_URL}auth/register`, userData);
      const token = response.data;
      await AsyncStorage.setItem('token', token);
      getLists()
      return "Nice to meet you";
    } catch (error) {
      throw new Error (error.response.data);
    }
  };

  const createList = async (newListData) => {
    try {
      const token = await AsyncStorage.getItem('token');
      console.log(await fetchToken(token))
      const response = await axios.post(`${API_URL}todoList`, newListData, {
        headers: {
          Authorization: `${token}`,
        },
      });
      console.log('New list created:', response.data);
      getLists(); 
    } catch (error) {
      console.log('Error creating list:', error);
    }
  };

  const updateList = async (listId, updatedListData) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.put(`${API_URL}todoList/${+listId}`, updatedListData, {
        headers: {
          Authorization: `${token}`,
        },
      });
      console.log('List updated:', response.data);
      getLists();
    } catch (error) {
      console.log('Error updating list:', error);
    }
  };

  const deleteList = async (listId) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.delete(`${API_URL}todoList/${+listId}`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      console.log('List deleted:', response.data);
      getLists(); // Actualizar la lista después de eliminarla
    } catch (error) {
      console.log('Error deleting list:', error);
    }
  };

  /////tasks/////////
  const getTasks = async (listId) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.get(`${API_URL}task/${+listId}`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      await AsyncStorage.setItem('data', response.data);
      setTasks(response.data);
    } catch (error) {
      console.log('Error fetching tasks:', error);
    }
  };

  const updateTasks = async (listId, taskId) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.put(`${API_URL}task/${+taskId}`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      console.log('Task updated:', response.data);
      getLists();
      getTasks(listId)
    } catch (error) {
      console.log('Error updating task:', error);
    }
  };

  const addTasks = async (idList, task) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.post(`${API_URL}task`, {
        ListId: idList,
        Task: {
          Title: task.title,
          Completed: false,
        },
      }, {
        headers: {
          Authorization: `${token}`,
        },
      });
      console.log('New task added:', response.data);
      getLists();
      getTasks(idList);
    } catch (error) {
      console.log('Error adding task:', error);
    }
  };

  const deleteTask = async (listId, taskId) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.delete(
        `${API_URL}task/${+taskId}`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      console.log('Task deleted:', response.data);
      getTasks(listId);
      getLists(); 
    } catch (error) {
      console.log('Error deleting task:', error);
    }
  };

  const value = {
    login,
    signUp,
    logOut,

    toDoLists,
    createList,
    getLists,
    updateList,
    deleteList,
    
    getTasks,
    addTasks,
    tasks,
    updateTasks,
    deleteTask,
  }

  return (
    <ToDoContext.Provider value={ value }>
      {children}
    </ToDoContext.Provider>
  );
};

export default ToDoContext;