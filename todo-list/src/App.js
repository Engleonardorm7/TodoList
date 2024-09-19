import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState();
  const [tasks, setTasks] = useState(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    return savedTasks;
  });

  //to save tasks in the local storage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const inputChange = (textInput) => {
    setTask(textInput.target.value);
  };

  const addTask = () => {
    if (task) {
      const newTasks = [...tasks, task];
      setTasks(newTasks);
      setTask("");
    }
  };

  const deleteTask = (taskToDelete) => {
    const newTasks = tasks.filter((task) => task !== taskToDelete);
    setTasks(newTasks);
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <input
        type="text"
        value={task}
        onChange={inputChange}
        placeholder="Add a new task"
      />
      <button onClick={addTask}>Add Task</button>

      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {task}
            <button onClick={() => deleteTask(task)}>x</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
