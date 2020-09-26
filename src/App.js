import React, { useState } from "react";
import { Route, useHistory } from "react-router-dom";
import EditorPage from "./pages/EditorPage/editor.pages";
import Form from "./Components/Form/Form.component";
import useLocalStorage from "./hooks/useLocalStorage.hooks";
import Homepage from "./pages/Homepage/Homepage.pages";
function App() {
  const [user, setUser] = useLocalStorage("CurrentUser", {});
  const [userid, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const onSumit = (event) => {
    if (userid && password) {
      setUser({
        userid,
        password,
      });
      history.push("/");
    }
    event.preventDefault();
  };

  return (
    <div className="App">
      <Route
        path="/"
        exact
        render={() => <Homepage user={user} setUser={setUser} />}
      />
      <Route
        path="/signin"
        exact
        render={() => (
          <Form
            user={user}
            setPassword={setPassword}
            setUserId={setUserId}
            btnText={"Signin"}
            onSumit={onSumit}
            to="register"
          />
        )}
      />
      <Route
        path="/register"
        exact
        render={() => (
          <Form
            user={user}
            setPassword={setPassword}
            setUserId={setUserId}
            btnText={"Register"}
            to="signin"
            onSumit={onSumit}
          />
        )}
      />
      <Route
        path="/:userid/pen/:id"
        exact
        render={() => <EditorPage user={user} />}
      />
    </div>
  );
}

export default App;
