import React, { useEffect, useState } from 'react';
import { getTasks, deleteTask } from '../services/taskService';

function TaskList({ onEdit }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await getTasks();
    setTasks(response.data);
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    fetchTasks();
  };

  return (
    <div className="container mt-4">
      <h2>Task List</h2>
      <ul className="list-group">
        {tasks.map(task => (
          <li key={task.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <h5>{task.title}</h5>
              <p>{task.description}</p>
              <small>{task.completed ? "Completed" : "Pending"}</small>
            </div>
            <div>
              <button onClick={() => onEdit(task)} className="btn btn-primary btn-sm me-2">Edit</button>
              <button onClick={() => handleDelete(task.id)} className="btn btn-danger btn-sm">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
