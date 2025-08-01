import React from "react";
import pencilIcon from "../assets/pencil.png";
import trashIcon from "../assets/trash-bin.png";

function TodoItem({
  task,
  deleteTask,
  toggleTaskCompletion,
  editTask,
  saveEdit,
  cancelEdit,
  editingId,
  editingText,
  setEditingText,
}) {
  function handleChange() {
    toggleTaskCompletion(task.id);
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }

  const isEditing = editingId === task.id;

  return (
    <li className={`todo-item shadow-sm ${task.completed ? "completed" : ""}`}>
      <div className="todo-item-content">
        <label className="custom-checkbox">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={handleChange}
          />
          <span className="checkmark"></span>
        </label>
        <div className="todo-item-text">
          {isEditing ? (
            <div className="todo-item-edit">
              <input
                className="todo-item-edit-input form-control"
                type="text"
                value={editingText}
                onChange={(e) => setEditingText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") saveEdit(task.id);
                }}
                autoFocus
              />
              <div className="todo-item-edit-actions">
                <button className="btn save-btn" onClick={() => saveEdit(task.id)}>
                  Salvar
                </button>
                <button className="btn cancel-btn" onClick={cancelEdit}>
                  Cancelar
                </button>
              </div>
            </div>
          ) : (
            <>
              <span>{task.text}</span>
              <small className="todo-item-date">
                {formatDate(task.createdAt)}
              </small>
            </>
          )}
        </div>
      </div>
      <div className="todo-item-actions">
        <button className="btn" onClick={() => deleteTask(task.id)}>
          <img src={trashIcon} alt="" />
        </button>
        <button className="btn" onClick={() => editTask(task.id)}>
          <img src={pencilIcon} alt="" />
        </button>
      </div>
    </li>
  );
}

export default TodoItem;
