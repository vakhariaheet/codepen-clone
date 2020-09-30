import React, { useEffect } from "react";
import { Route, useHistory } from "react-router-dom";
import EditorPage from "./pages/EditorPage/editor.pages";
import Signin from "./Components/Signin/Signin.component";
import useLocalStorage from "./hooks/useLocalStorage.hooks";
import Homepage from "./pages/Homepage/Homepage.pages";
import TerminalComponent from "./Components/Termial";

import { config } from "dotenv";
import { auth, db } from "./firebase";

config();
function App() {
  const history = useHistory();
  const [user, setUser] = useLocalStorage("CurrentUser", {});
  const handelAuth = async () => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const { displayName, photoURL, uid } = user;

        const { docs } = await db.collection("users").get();
        const newUser = docs.filter((doc) => doc.data().uid === uid);
        console.log(newUser);
        if (!newUser.length) {
          const docRef = await db.collection(`users`).add({
            photoURL,
            displayName,
            uid,
          });
          const doc = await docRef.get();
          const userRef = await db.collection(`users/${doc.id}/pens`).add({
            name: "Demo Pen",
            code: {
              html: "",
              css: "",
              js: "",
            },
          });
          const pens = await userRef.get();
          setUser({
            id: doc.id,
            ...doc.data(),
            pens: [
              {
                id: pens.id,
                ...pens.data(),
              },
            ],
          });
        } else {
          // console.log(newUser[0].id);
          const { id } = newUser[0];
          const data = newUser[0].data();
          const pensArr = [];
          const pens = await db.collection(`users/${id}/pens`).get();
          pens.docs.forEach((doc) => {
            pensArr.push({
              id: doc.id,
              ...doc.data(),
            });
          });
          console.log(pens.docs, pensArr);
          setUser({
            id: id,
            ...data,
            pens: pensArr,
          });
          history.push("/");
        }
      }
    });
  };
  useEffect(() => {
    if (user.id) {
      history.push("/");
    }
    handelAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
