import React, { createContext, useEffect, useState } from 'react';
import tempData from '../tempData';

const ToDoContext = createContext();

export const ToDoProvider = ({ children }) => {
  const [toDoLists, setToDoLists] = useState();
  const [tasks, setTasks] = useState([])

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