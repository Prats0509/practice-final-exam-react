import React, { useState } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [editingTask, setEditingTask] = useState(null);

  const refreshTasks = () => {
    window.location.reload(); // simple way to refresh list
  };

  const clearEditing = () => {
    setEditingTask(null);
  };

  return (
    <div className="container">
      <h1 className="mt-4 text-center">Todo Task Manager</h1>
      <TaskForm currentTask={editingTask} refreshTasks={refreshTasks} clearEditing={clearEditing} />
      <TaskList onEdit={setEditingTask} />
    </div>
  );
}

export default App;
