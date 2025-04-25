import React, { useState, useEffect } from 'react';
import { createTask, updateTask } from '../services/taskService';

function TaskForm({ currentTask, refreshTasks, clearEditing }) {
  const [task, setTask] = useState({ title: '', description: '', completed: false });

  useEffect(() => {
    if (currentTask) {
      setTask(currentTask);
    } else {
      setTask({ title: '', description: '', completed: false });
    }
  }, [currentTask]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTask(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (task.id) {
      await updateTask(task.id, task);
    } else {
      await createTask(task);
    }
    refreshTasks();
    clearEditing();
  };

  return (
    <div className="container mt-4">
      <h2>{task.id ? "Edit Task" : "Create New Task"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input name="title" value={task.title} onChange={handleChange} className="form-control" required />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea name="description" value={task.description} onChange={handleChange} className="form-control" required />
        </div>

        <div className="form-check mb-3">
          <input type="checkbox" name="completed" checked={task.completed} onChange={handleChange} className="form-check-input" />
          <label className="form-check-label">Completed</label>
        </div>

        <button type="submit" className="btn btn-success">{task.id ? "Update" : "Create"}</button>
      </form>
    </div>
  );
}

export default TaskForm;
