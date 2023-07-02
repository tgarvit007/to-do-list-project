import React, { useState } from 'react';
import './homepage.css';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editedTask, setEditedTask] = useState('');
  const [editedTaskIndex, setEditedTaskIndex] = useState(null);

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, newTask]);
      setNewTask('');
    }
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
    cancelEdit();
  };

  const startEdit = (index, task) => {
    setEditedTask(task);
    setEditedTaskIndex(index);
    setEditMode(true);
  };

  const updateTask = () => {
    if (editedTask.trim() !== '') {
      const updatedTasks = [...tasks];
      updatedTasks[editedTaskIndex] = editedTask;
      setTasks(updatedTasks);
      cancelEdit();
    }
  };

  const cancelEdit = () => {
    setEditedTask('');
    setEditedTaskIndex(null);
    setEditMode(false);
  };

  return (
    <div className="task-container">
      <div className="task">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={addTask}>Add</button>
      </div>
      <ul>
        {tasks.map((task, index) => (
          <li key={index} className="task">
            {editMode && editedTaskIndex === index ? (
              <div>
                <input
                  type="text"
                  value={editedTask}
                  onChange={(e) => setEditedTask(e.target.value)}
                />
                <button onClick={updateTask}>Update</button>
                <button onClick={cancelEdit}>Cancel</button>
              </div>
            ) : (
              <div>
                {task}
                <button onClick={() => startEdit(index, task)}>Edit</button>
                <button onClick={() => deleteTask(index)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
