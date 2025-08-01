import { useState } from "react";
import TodoItem from "./TodoItem";
import reactLogo from "../assets/react.svg";

function TodoList() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: "Learn React 📖",
      completed: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: 2,
      text: "Build a To-Do App 💻",
      completed: false,
      createdAt: new Date().toISOString(),
    },
    {
      id: 3,
      text: "Deploy the App 🚀",
      completed: false,
      createdAt: new Date().toISOString(),
    },
  ]);

  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [text, setText] = useState("");
  const [filter, setFilter] = useState("All");
  const getFilteredTasks = () => {
    switch (filter) {
      case "Pending":
        return tasks.filter((task) => !task.completed);
      case "Completed":
        return tasks.filter((task) => task.completed);
      default:
        return tasks;
    }
  };

  function addTask(text) {
    const now = new Date();
    const newTask = {
      id: Date.now(),
      text: text,
      completed: false,
      createdAt: now.toISOString(),
    };
    setTasks([...tasks, newTask]);
    setText("");
  }

  function deleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  function toggleTaskCompletion(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  function editTask(id) {
    const taskToEdit = tasks.find((task) => task.id === id);
    if (taskToEdit) {
      setEditingId(id);
      setEditingText(taskToEdit.text);
    }
  }

  function saveEdit() {
    setTasks(
      tasks.map((task) =>
        task.id === editingId ? { ...task, text: editingText } : task
      )
    );
    setEditingId(null);
    setEditingText("");
  }

  function cancelEdit() {
    setEditingId(null);
    setEditingText("");
  }

  return (
    <div className="container">
      <div className="todo-header">
        <h1>To-Do List</h1>
      </div>
      <div className="todo-body">
        <div className="todo-input">
          <input
            type="text"
            className="form-control"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add a new task"
            onKeyDown={(e) => {
              if (e.key === "Enter" && text.trim()) {
                addTask(text);
              }
            }}
          />
          <div className="todo-input-buttons">
            <button
              className="btn btn-primary add-task-btn"
              onClick={() => addTask(text)}
            >
              Add Task
            </button>
            <div className="dropdown">
              <button
                className="btn dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {filter}
              </button>
              <ul className="dropdown-menu">
                <li>
                  <a
                    className="dropdown-item"
                    href="#"
                    onClick={() => setFilter("All")}
                  >
                    All
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    href="#"
                    onClick={() => setFilter("Pending")}
                  >
                    Pending
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    href="#"
                    onClick={() => setFilter("Completed")}
                  >
                    Completed
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="todo-list">
          <ul>
            {getFilteredTasks().map((task) => (
              <TodoItem
                key={task.id}
                task={task}
                deleteTask={deleteTask}
                toggleTaskCompletion={toggleTaskCompletion}
                editingId={editingId}
                editingText={editingText}
                setEditingText={setEditingText}
                editTask={editTask}
                saveEdit={saveEdit}
                cancelEdit={cancelEdit}
              />
            ))}
          </ul>
          <div className="todo-list-footer">
            <hr />
            <div className="todo-list-info">
              <span>
                {tasks.filter((task) => !task.completed).length} tasks remaining
              </span>
              <span className="delete-all" onClick={() => setTasks([])}>
                Delete All
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="todo-footer">
        <p className="text-center text-muted mb-0">
          Made with {" "}
          <img
            src={reactLogo}
            alt="React logo"
            className="react-logo"
          />{" "}
          by{" "}
          <a
            href="https://github.com/duduhnrq"
            target="_blank"
            rel="noopener noreferrer"
          >
            duduhnrq
          </a>
        </p>
      </div>
    </div>
  );
}

export default TodoList;
