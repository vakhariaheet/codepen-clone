import React from "react";
import { Route } from "react-router-dom";
import EditorPage from "./pages/editor.pages";
function App() {
  return (
    <div className="">
      <Route exact path="/:userid/pen/:id" component={EditorPage} />
    </div>
  );
}

export default App;
