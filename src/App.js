import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import Todolist from './Todolist';
import { v4 as uuidv4 } from 'uuid';

const LOCAL_STORAGE_KEY = 'todoApp.todos';

function App() {
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();
  console.log(todos);

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTodos) setTodos(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  function toggleTodo(id) {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.complete = !todo.complete;
    setTodos(newTodos);
  }

  function handleAddTodo(e) {
    console.log(todos);
    const name = todoNameRef.current.value;
    if (name === '') return;
    setTodos((prevTodos) => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false }];
    });
    todoNameRef.current.value = null;
    console.log(todos);
  }
  function handleClearTodos() {
    const newTodos = todos.filter((todo) => !todo.complete);
    setTodos(newTodos);
  }

  return (
    <>
      <h1>You have to do</h1>
      <input ref={todoNameRef} type="text" />
      <button onClick={handleAddTodo}>Add Todo</button>
      <button onClick={handleClearTodos}>Clear completed</button>
      <div> {todos.filter((todo) => !todo.complete).length} left to do</div>
      <Todolist todos={todos} toggleTodo={toggleTodo} />
    </>
  );
}

export default App;
