import React, { useEffect, useState } from 'react';
import AddTodo from '../AddTodo';
import Todo from '../Todo';
import './index.css';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Home = () => {
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!Cookies.get('token')) {
      navigate('/login', { replace: true });
    }
  }, [navigate]);


  useEffect(() => {
    getTodos();
  }, []);

  const getTodos = async () => {
    try {
      const response = await fetch("https://todoapi-d24p.onrender.com/api/todos", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${Cookies.get('token')}`
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch todos');
      }

      const data = await response.json();
      setTodos(data); 
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message, // Display the error message
      });
    }
  };

  const addTodo = async (title) => {
    try {
      const response = await fetch("https://todoapi-d24p.onrender.com/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${Cookies.get('token')}` 
        },
        body: JSON.stringify({ title }),
      });

      if (!response.ok) {
        throw new Error('Failed to add todo');
      }

      const newTodo = await response.json();
      setTodos([newTodo, ...todos]);
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Todo added successfully!',
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message,
      });
    }
  };

  const deleteTodo = async (id) => {
    try {
      const response = await fetch(`https://todoapi-d24p.onrender.com/api/todos/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${Cookies.get('token')}`
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete todo');
      }

      const updatedTodos = todos.filter(todo => todo.id !== id);
      setTodos(updatedTodos);
      Swal.fire({
        icon: 'success',
        title: 'Deleted',
        text: 'Todo deleted successfully!',
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message,
      });
    }
  };

  const updateTodo = async (id, updatedTitle, updatedStatus) => {
    try {
      const response = await fetch(`https://todoapi-d24p.onrender.com/api/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${Cookies.get('token')}` 
        },
        body: JSON.stringify({ title: updatedTitle, status: updatedStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update todo');
      }

      const updatedTodos = todos.map(todo =>
        todo.id === id ? { ...todo, title: updatedTitle, status: updatedStatus } : todo
      );
      setTodos(updatedTodos);
      Swal.fire({
        icon: 'success',
        title: 'Updated',
        text: 'Todo updated successfully!',
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message, 
      });
    }
  };

  return (
    <div className='container minHeight m-0 p-0'>
      <AddTodo onAddTodo={addTodo} />
      {
        todos.length!==0?(<div className='row m-0 p-0 mt-3 mb-2'>
            {todos.map((todo) => (
              <Todo
                key={todo.id}
                id={todo.id}
                initialTitle={todo.title}
                initialStatus={todo.status}
                onDelete={deleteTodo}
                onUpdate={updateTodo}
              />
            ))}
          </div>):(<p className='text-center mt-5'>You Dont have any todos Start Creating</p>)
      }
      
    </div>
  );
};

export default Home;
