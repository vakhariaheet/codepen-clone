import React, { useState } from "react";
import { Route, useHistory } from "react-router-dom";
import EditorPage from "./pages/EditorPage/editor.pages";
import Form from "./Components/Form/Form.component";
import useLocalStorage from "./hooks/useLocalStorage.hooks";
import Homepage from "./pages/Homepage/Homepage.pages";
import { config } from "dotenv";
config();
function App() {
  const [user, setUser] = useLocalStorage("CurrentUser", {});
  const [userid, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const onSumit = async (type) => {
    if (userid && password) {
      fetch(`${process.env.REACT_APP_SERVER_URL}/${type}`, {
        method: "post",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          userid,
          password,
        }),
      })
        .then((resp) => resp.json())
        .then((user) => {
          if (!user._id) {
            alert("Wrong Creaditials");
            console.log(user);
          } else {
            setUser(user);
            history.push("/");
          }
        });
    }
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
            onSumit={() => onSumit("signin")}
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
            onSumit={() => onSumit("register")}
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
