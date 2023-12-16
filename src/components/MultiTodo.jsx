import React, { useState } from 'react';

const MultiTodo = () => {
  const [todos, setTodos] = useState([{ title: '', subtasks: [{ task: '', completed: false }] }]);

  const handleTodoTitleChange = (e, todoIndex) => {
    const newTodos = [...todos];
    newTodos[todoIndex].title = e.target.value;
    setTodos(newTodos);
  };

  const handleSubtaskChange = (e, todoIndex, subtaskIndex) => {
    const newTodos = [...todos];
    newTodos[todoIndex].subtasks[subtaskIndex].task = e.target.value;
    setTodos(newTodos);
  };

  const handleSubtaskToggle = (todoIndex, subtaskIndex) => {
    const newTodos = [...todos];
    newTodos[todoIndex].subtasks[subtaskIndex].completed = !newTodos[todoIndex].subtasks[subtaskIndex].completed;
    setTodos(newTodos);
  };

  const handleAddSubtask = (todoIndex) => {
    const newTodos = [...todos];
    newTodos[todoIndex].subtasks.push({ task: '', completed: false });
    setTodos(newTodos);
  };

  const handleRemoveSubtask = (todoIndex, subtaskIndex) => {
    const newTodos = [...todos];
    newTodos[todoIndex].subtasks.splice(subtaskIndex, 1);
    setTodos(newTodos);
  };

  const handleRemoveTodo = (todoIndex) => {
    const newTodos = [...todos];
    newTodos.splice(todoIndex, 1);
    setTodos(newTodos);
  };

  const handleAddTodo = () => {
    setTodos([...todos, { title: '', subtasks: [{ task: '', completed: false }] }]);
  };

  return (
    <div className="container mx-auto my-8">
      {todos.map((todo, todoIndex) => (
        <div key={todoIndex} className="my-4 p-4 border border-gray-300 rounded">
          <input
            type="text"
            placeholder="Todo Title"
            value={todo.title}
            onChange={(e) => handleTodoTitleChange(e, todoIndex)}
            className="border-b-2 border-gray-400 mb-2 p-2"
          />
          {todo.subtasks.map((subtask, subtaskIndex) => (
            <div key={subtaskIndex} className="flex items-center my-2">
              <input
                type="text"
                placeholder="Subtask"
                value={subtask.task}
                onChange={(e) => handleSubtaskChange(e, todoIndex, subtaskIndex)}
                className="border-b-2 border-gray-400 p-2 flex-grow"
              />
              <input
                type="checkbox"
                checked={subtask.completed}
                onChange={() => handleSubtaskToggle(todoIndex, subtaskIndex)}
                className="mx-2"
              />
              <button
                onClick={() => handleRemoveSubtask(todoIndex, subtaskIndex)}
                className="bg-red-500 text-black px-2 py-1 rounded"
              >
                Remove Subtask
              </button>
            </div>
          ))}
          <button onClick={() => handleAddSubtask(todoIndex)} className="bg-blue-500 text-black px-2 py-1 rounded">
            Add Subtask
          </button>
          <button onClick={() => handleRemoveTodo(todoIndex)} className="bg-red-500 text-black px-2 py-1 rounded mt-2">
            Remove Todo
          </button>
        </div>
      ))}
      <button onClick={handleAddTodo} className="bg-green-500 text-black px-4 py-2 rounded">
        Add Todo
      </button>
    </div>
  );
};

export default MultiTodo;