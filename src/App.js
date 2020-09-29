import React, { useState } from "react";
import { Route, useHistory } from "react-router-dom";
import EditorPage from "./pages/EditorPage/editor.pages";
import Signin from "./Components/Signin/Signin.component";
import useLocalStorage from "./hooks/useLocalStorage.hooks";
import Homepage from "./pages/Homepage/Homepage.pages";
import TerminalComponent from "./Components/Termial";
import Register from "./Components/Register/Register.component";
import { config } from "dotenv";

config();
function App() {
  const [user, setUser] = useLocalStorage("CurrentUser", {});

  const history = useHistory();

  return (
    <div className="App">
      <Route
        path="/"
        exact
        render={() => <Homepage user={user} setUser={setUser} />}
      />
      <Route path="/terminal" component={TerminalComponent} />
      <Route
        path="/signin"
        exact
        render={() => <Signin user={user} setUser={setUser} />}
      />
      <Route
        path="/register"
        exact
        render={() => <Register user={user} setUser={setUser} />}
      />
      <Route path="/newPen" exact render={() => <EditorPage />} />
      <Route
        path="/:userid/pen/:id"
        exact
        render={() => <EditorPage user={user} />}
      />
    </div>
  );
}

export default App;
