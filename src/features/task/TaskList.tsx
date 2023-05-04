import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, removeTask, updateTaskName, Task } from "./taskSlice";
import { RootState } from "../../app/store";
import "./TaskList.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

export function TaskList({ columnId }: { columnId: number }) {
  const dispatch = useDispatch();

  const column = useSelector((state: RootState) =>
    state.column.columns.find((c) => c.id === columnId)
  );
  const tasks = useSelector((state: RootState) => state.task.tasks);

  const [newTaskName, setNewTaskName] = useState<string>("");
  const [editedTaskId, setEditedTaskId] = useState<number | null>(null);
  const [editedTaskName, setEditedTaskName] = useState<string>("");

  const handleAddTask = () => {
    if (newTaskName !== "") {
      dispatch(addTask(columnId, newTaskName));
      setNewTaskName("");
    }
  };

  const handleRemoveTask = (id: number) => {
    dispatch(removeTask(id));
  };

  const handleEditTask = (id: number, name: string) => {
    setEditedTaskId(id);
    setEditedTaskName(name);
  };

  const handleUpdateTaskName = () => {
    if (editedTaskId !== null && editedTaskName !== "") {
      const updatedTask: Task = {
        id: editedTaskId,
        name: editedTaskName,
        columnId,
      };
      dispatch(updateTaskName(updatedTask));
      setEditedTaskId(null);
      setEditedTaskName("");
    }
  };

  return (
    <div className="task-list">
      <ul className="task-list__list">
        {tasks
          .filter((task) => task.columnId === columnId)
          .map((task) => (
            <li key={task.id} className="task-list__item">
              {editedTaskId === task.id ? (
                <div className="task-list__save-actions">
                  <input
                    type="text"
                    value={editedTaskName}
                    onChange={(e) => setEditedTaskName(e.target.value)}
                    className="task-list__add-input"
                  />
                  <button
                    onClick={handleUpdateTaskName}
                    className="task-list__save-button"
                    disabled={editedTaskName === ""}
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditedTaskId(null)}
                    className="task-list__cancel-button"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <>
                  <span className="task-list__task-content">{task.name}</span>
                  <div className="task-list__actions">
                    <button
                      onClick={() => handleEditTask(task.id, task.name)}
                      className="task-list__edit-button"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleRemoveTask(task.id)}
                      className="task-list__remove-button"
                    >
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
      </ul>
      <div className="task-list__add-form">
        <input
          type="text"
          value={newTaskName}
          onChange={(e) => setNewTaskName(e.target.value)}
          className="task-list__add-input"
          placeholder="Add a task..."
        />
        <button
          onClick={handleAddTask}
          className="task-list__add-button"
          disabled={newTaskName === ""}
        >
          Add
        </button>
      </div>
    </div>
  );
}
