import React, { useState } from 'react';

const AddTodo = ({ onAddTodo }) => {
    const [todoTitle, setTodoTitle] = useState('');

    const handleInputChange = (e) => {
        setTodoTitle(e.target.value);
    };

    const handleAddTodo = () => {
        if (todoTitle.trim()) {
            onAddTodo(todoTitle);
            setTodoTitle('');
        } else {
            alert("Todo title cannot be empty");
        }
    };

    return (
        <div className='row col-12 col-lg-9 m-auto p-0 my-4'>
            <input
                type='text'
                className='p-2 rounded-2 col-11 col-lg-8'
                placeholder='Enter Todo Title'
                value={todoTitle}
                onChange={handleInputChange}
            />
            <button
                type='button'
                className='col-3 col-lg-2 m-auto btn bg-white text-dark fw-bold'
                onClick={handleAddTodo}
            >
                Add Todo
            </button>
        </div>
    );
};

export default AddTodo;
