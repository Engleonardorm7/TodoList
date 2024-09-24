import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import {
  AiOutlineCheck,
  AiOutlineClose,
  AiOutlineSearch,
  FaPlus,
} from "react-icons/ai";

import "./App.css";

Modal.setAppElement("#root");

function App() {
  const [task, setTask] = useState();
  const [tasks, setTasks] = useState(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    return savedTasks;
  });
  const [searchTask, setSearchTask] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);

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
      setModalIsOpen(false);
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
    <div className="app-container">
      <h1>To-Do List</h1>
      <p>
        You have completed {completedTasks} of {totalTasks} tasks
      </p>
      <div className="search-container">
        <AiOutlineSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search tasks"
          value={searchTask}
          onChange={(task) => setSearchTask(task.target.value)}
          className="search-input"
        />
      </div>

      <ul className="task-list">
        {filteredTasks.map((task, index) => (
          <li
            key={index}
            className={`task-item ${task.completed ? "completed" : ""}`}
            // style={{ textDecoration: task.completed ? "line-through" : "none" }}
          >
            <span
              // style={{
              //   color: task.completed ? "green" : "black",
              //   cursor: "pointer",
              // }}
              onClick={() => taskCompleted(task.text)}
              className="task-text"
            >
              {task.completed ? <AiOutlineCheck /> : <AiOutlineCheck />}
              {task.text}
            </span>

            {/* <button onClick={() => deleteTask(task.text)}>x</button> */}
            <AiOutlineClose
              className="delete-icon"
              onClick={() => deleteTask(task.text)}
            />
          </li>
        ))}
      </ul>

      <button onClick={() => setModalIsOpen(true)} className="add-task-btn">
        {" "}
        +{" "}
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="add task modal"
        className="modal"
        overlayClassName="overlay"
      >
        <input
          type="text"
          value={task}
          onChange={inputChange}
          placeholder="Add a new task"
          className="task-input"
        />
        <div className="modal-buttons">
          <button onClick={addTask}>Add Task</button>
          <button onClick={() => setModalIsOpen(false)}>Cancel</button>
        </div>
      </Modal>
    </div>
  );
}

export default App;
