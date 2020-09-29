import React, { useState } from "react";
import { Route, useHistory } from "react-router-dom";
import EditorPage from "./pages/EditorPage/editor.pages";
import Form from "./Components/Form/Form.component";
import useLocalStorage from "./hooks/useLocalStorage.hooks";
import Homepage from "./pages/Homepage/Homepage.pages";
import TerminalComponent from "./Components/Termial";
import { db } from "./firebase";
import { config } from "dotenv";
import uid from "uid";
config();
function App() {
  const [user, setUser] = useLocalStorage("CurrentUser", {});
  const [userid, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const onSumit = async (type) => {
    if (userid && password) {
      const docRef = await db.collection("users").add({
        userid,
        password,
        pens: [
          {
            name: "Demo",
            id: uid(),
            code: {
              html: "<h1>Hello</h1>",
              css: "h1{color:#333}",
              js: "",
            },
          },
        ],
      });
      const doc = await docRef.get();
      setUser({
        id: doc.id,
        ...doc.data(),
      });
      console.log(doc.data(), doc.id, doc);
      history.push("/");
    }
  };

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
      {/* <Route
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
          /> */}
      {/* )} /> */}
      <Route
        path="/:userid/pen/:id"
        exact
        render={() => <EditorPage user={user} />}
      />
    </div>
  );
}

export default App;
