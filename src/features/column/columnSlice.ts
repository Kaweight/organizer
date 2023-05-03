import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface Column {
  id: number;
  title: string;
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
      const newColumn = {
        id: state.columns.length + 1,
        title: "List name",
      };
      state.columns.push(newColumn);
    },
    removeColumn: (state, action: PayloadAction<number>) => {
      state.columns = state.columns.filter(
        (column) => column.id !== action.payload
      );
    },
    updateColumnTitle: (
      state,
      action: PayloadAction<{ id: number; title: string }>
    ) => {
      const { id, title } = action.payload;
      const column = state.columns.find((c) => c.id === id);
      if (column) {
        column.title = title;
      }
    },
  },
});

export const { addColumn, removeColumn, updateColumnTitle } =
  columnSlice.actions;

export default columnSlice.reducer;
