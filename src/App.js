// App.js
import React, { useState } from 'react';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [taskText, setTaskText] = useState('');
  const [tasks, setTasks] = useState([]);
  const [sortedTasks, setSortedTasks] = useState([]);
  const [showRepeatedTasks, setShowRepeatedTasks] = useState(false);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleTaskTextChange = (event) => {
    setTaskText(event.target.value);
  };

  const handleTaskAdd = () => {
    if (taskText) {
      setTasks([...tasks, { text: taskText, id: Date.now() }]);
      setTaskText('');
    }
  };

  const handleTaskRemove = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const handleSortTasks = (order) => {
    const sorted = [...tasks].sort((a, b) => {
      if (order === 'increasing') {
        return a.text.localeCompare(b.text);
      } else {
        return b.text.localeCompare(a.text);
      }
    });
    setSortedTasks(sorted);
  };

  const handleToggleRepeatedTasks = () => {
    setShowRepeatedTasks(!showRepeatedTasks);
  };

  const repeatedTasks = tasks.filter(
    (task, index) => tasks.findIndex((t) => t.text === task.text) !== index
  );

  return (
    <div className="App">
      <h1>Task Manager App</h1>
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={handleNameChange}
      />
      {name && <p>Hello, {name}!</p>}
      <h2>Add a Task</h2>
      <div className="add-task">
        <input
          type="text"
          placeholder="Enter task"
          value={taskText}
          onChange={handleTaskTextChange}
        />
        <button onClick={handleTaskAdd}>Add Task</button>
      </div>
      <h2>Tasks for the Day</h2>
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id}>
            <span className="task-text">{task.text}</span>
            <button style={{padding:'0px 20px'}} className="remove-button" onClick={() => handleTaskRemove(task.id)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
      <h2>Sorted Tasks</h2>
      <div className="sort-buttons">
        <button onClick={() => handleSortTasks('increasing')}>Sort Increasing</button>
        <button onClick={() => handleSortTasks('decreasing')}>Sort Decreasing</button>
      </div>
      <ul className="task-list">
        {sortedTasks.map((task) => (
          <li key={task.id}>
            <span className="task-text">{task.text}</span>
            <button className="remove-button" onClick={() => handleTaskRemove(task.id)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
      <div className="show-repeated">
        <label>
          Show Repeated Tasks
          <input
            type="checkbox"
            checked={showRepeatedTasks}
            onChange={handleToggleRepeatedTasks}
          />
        </label>
      </div>
      {showRepeatedTasks && (
        <div>
          <h2>Repeated Tasks</h2>
          <ul className="task-list">
            {repeatedTasks.map((task, index) => (
              <li key={index}>
                <span className="task-text">{task.text}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
