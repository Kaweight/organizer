import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addColumn, removeColumn, updateColumnTitle } from "./columnSlice";
import { RootState } from "../../app/store";
import "./ColumnList.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { TaskList } from "../task/TaskList";

export function ColumnList() {
  const dispatch = useDispatch();
  const columns = useSelector((state: RootState) => state.column.columns);

  const handleAddColumn = () => {
    dispatch(addColumn());
  };

  const handleRemoveColumn = (id: number) => {
    dispatch(removeColumn(id));
  };

  const [editedColumnId, setEditedColumnId] = useState<number | null>(null);
  const [newColumnTitle, setNewColumnTitle] = useState<string>("");
  const [newTaskName, setNewTaskName] = useState<string>("");
  const [newTaskAdded, setNewTaskAdded] = useState<boolean>(false);

  const handleEditColumn = (id: number, title: string) => {
    setEditedColumnId(id);
    setNewColumnTitle(title);
  };

  const handleCancelEditColumn = () => {
    setEditedColumnId(null);
    setNewColumnTitle("");
  };

  const handleUpdateTitle = () => {
    if (editedColumnId !== null) {
      dispatch(
        updateColumnTitle({ id: editedColumnId, title: newColumnTitle })
      );
      setEditedColumnId(null);
      setNewColumnTitle("");
    }
  };

  return (
    <>
      <button className="column__add-button" onClick={handleAddColumn}>
        Add list
      </button>
      <div className="column__wrapper">
        {columns.map((column) => (
          <div key={column.id} className="column">
            {editedColumnId === column.id ? (
              <div className="column__change-name-box">
                <input
                  className="column__name-input"
                  type="text"
                  value={newColumnTitle}
                  onChange={(e) => setNewColumnTitle(e.target.value)}
                />
                <button
                  className="column__save-button"
                  onClick={handleUpdateTitle}
                  disabled={newColumnTitle.length === 0}
                >
                  Save
                </button>
                <button
                  className="column__remove-button"
                  onClick={handleCancelEditColumn}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="column__content-box">
                <div className="column__inner-elements">
                  <h2
                    className="column__title"
                    onClick={() => handleEditColumn(column.id, column.title)}
                  >
                    {column.title}
                  </h2>
                  <div className="column__info-box">
                    <FontAwesomeIcon
                      icon={faInfoCircle}
                      style={{ color: "#3a8891" }}
                      className="column__info-icon"
                    />
                    <div className="column__info-content">
                      <p>Press the header to change the name.</p>
                    </div>
                  </div>
                </div>
                <TaskList columnId={column.id} />
                <button
                  className="column__remove-button"
                  onClick={() => handleRemoveColumn(column.id)}
                >
                  Delete list
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default ColumnList;
