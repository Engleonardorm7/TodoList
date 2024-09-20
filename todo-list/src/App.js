import React, { useEffect, useState } from "react";
import { AiOutlineCheck } from "react-icons/ai";

import "./App.css";

function App() {
  const [task, setTask] = useState();
  const [tasks, setTasks] = useState(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    return savedTasks;
  });
  const [searchTask, setSearchTask] = useState("");
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;

  //to save tasks in the local storage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const inputChange = (textInput) => {
    setTask(textInput.target.value);
  };

  const addTask = () => {
    if (task) {
      const newTasks = [...tasks, { text: task, completed: false }];
      setTasks(newTasks);
      setTask("");
    }
  };

  const deleteTask = (taskToDelete) => {
    const newTasks = tasks.filter((task) => task.text !== taskToDelete);
    setTasks(newTasks);
  };

  const filteredTasks = tasks.filter((task) =>
    task.text.toLowerCase().includes(searchTask.toLowerCase())
  );

  const taskCompleted = (taskToComplete) => {
    const newTasks = tasks.map((task) => {
      if (task.text === taskToComplete) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(newTasks);
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <p>
        Has completado {completedTasks} de {totalTasks} tasks
      </p>
      <input
        type="text"
        value={task}
        onChange={inputChange}
        placeholder="Add a new task"
      />
      <button onClick={addTask}>Add Task</button>

      <input
        type="text"
        placeholder="Search tasks"
        value={searchTask}
        onChange={(task) => setSearchTask(task.target.value)}
      />

      <ul>
        {filteredTasks.map((task, index) => (
          <li
            key={index}
            style={{ textDecoration: task.completed ? "line-through" : "none" }}
          >
            <span
              style={{
                color: task.completed ? "green" : "black",
                cursor: "pointer",
              }}
              onClick={() => taskCompleted(task.text)}
            >
              {task.completed ? <AiOutlineCheck /> : <AiOutlineCheck />}
              {task.text}
            </span>

            <button onClick={() => deleteTask(task.text)}>x</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
