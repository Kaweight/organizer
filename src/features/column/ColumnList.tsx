import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addColumn, removeColumn } from "./columnSlice";
import { RootState } from "../../app/store";

export function ColumnList() {
  const dispatch = useDispatch();
  const columns = useSelector((state: RootState) => state.column.columns);

  const handleAddDiv = () => {
    dispatch(addColumn());
  };

  const handleRemoveDiv = (id: number) => {
    dispatch(removeColumn(id));
  };

  return (
    <>
      <button onClick={handleAddDiv}>Add Div</button>
      {columns.map((div) => (
        <div key={div.id}>
          <button onClick={() => handleRemoveDiv(div.id)}>Remove Div</button>
        </div>
      ))}
    </>
  );
}

export default ColumnList;
