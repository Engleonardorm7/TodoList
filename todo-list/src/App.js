import React, { useEffect, useState } from 'react';
import './App.css';


function App(){

  const [task, setTask] = useState();
  const [tasks, setTasks] = useState(()=>{
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    return savedTasks;
  });
  
  //to save tasks in the local storage
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);
  


  const handleInputChange = (textInput) => {
    setTask(textInput.target.value);
    
  };

  const handleAddTask = () => {
    if(task){
      const newTasks=[...tasks,task]
      setTasks(newTasks);
      setTask('');
    }
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