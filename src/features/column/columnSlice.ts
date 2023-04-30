import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface Column {
  id: number;
}

interface ColumnsState {
  columns: Column[];
}

const initialState: ColumnsState = {
  columns: [],
};
export const columnSlice = createSlice({
  name: "column",
  initialState,
  reducers: {
    addColumn: (state) => {
      const newDiv = { id: state.columns.length + 1 };
      state.columns.push(newDiv);
    },
    removeColumn: (state, action: PayloadAction<number>) => {
      state.columns = state.columns.filter(
        (column) => column.id !== action.payload
      );
    },
  },
});

export const { addColumn, removeColumn } = columnSlice.actions;

export default columnSlice.reducer;
