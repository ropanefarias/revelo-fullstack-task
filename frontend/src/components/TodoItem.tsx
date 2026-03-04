import { useState, KeyboardEvent } from "react";
import { Todo } from "../types";

interface TodoItemProps {
  todo: Todo;
  onUpdate: (id: number, updates: Partial<Todo>) => void;
  onDelete: (id: number) => void;
}

function TodoItem({ todo, onUpdate, onDelete }: TodoItemProps) {
  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);

  const handleToggle = () => {
    onUpdate(todo.id, { completed: !todo.completed });
  };

  const handleEdit = () => {
    const trimmed = editTitle.trim();
    if (trimmed.length === 0) {
      setEditTitle(todo.title);
      setEditing(false);
      return;
    }
    if (trimmed !== todo.title) {
      onUpdate(todo.id, { title: trimmed });
    }
    setEditing(false);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      handleEdit();
    } else if (e.key === "Escape") {
      setEditTitle(todo.title);
      setEditing(false);
    }
  };

  return (
    <li className="todo-item">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={handleToggle}
      />
      {editing ? (
        <input
          className="todo-title-input"
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          onBlur={handleEdit}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      ) : (
        <span
          className={`todo-title ${todo.completed ? "completed" : ""}`}
          onDoubleClick={() => setEditing(true)}
        >
          {todo.title}
        </span>
      )}
      <button className="delete-btn" onClick={() => onDelete(todo.id)}>
        Delete
      </button>
    </li>
  );
}

export default TodoItem;
