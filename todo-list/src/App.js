import React, { useState } from 'react';
import './App.css';

function App(){
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  const handleInputChange = (textInput) => {
    setTask(textInput.target.value);
    
  };

  const handleAddTask = () => {
    setTasks([...tasks,task]);
    setTask('');
  };

  return(
    <div className='App'>
      <h1>To-Do List</h1>
      <input
      type='text'
      value={task}
      onChange={handleInputChange}
      placeholder='Add a new task'
      />
      <button onClick={handleAddTask}>Add Task</button>

      <ul>
        {tasks.map((task, index)=>(
          <li key = {index}>{task}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;