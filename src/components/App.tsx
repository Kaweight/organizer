import React from "react";
import { ColumnList } from "../features/column/ColumnList";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <h1 className="App__header">Your personal organizer</h1>
      <ColumnList />
    </div>
  );
}

export default App;
