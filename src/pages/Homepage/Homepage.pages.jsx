import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../../firebase";
import { db } from "../../firebase";
import { Link } from "react-router-dom";
const Homepage = ({ user, setUser, isUserSignin, setIsUserSignin }) => {
  const [name, setName] = useState("");
  const history = useHistory();
  const onSignOut = () => {
    if (user.id) {
      auth.signOut();
      setUser({});
      setIsUserSignin(false);
      history.push("/signin");
    }
  };
  useEffect(() => {
    if (!isUserSignin) {
      history.push("/signin");
    }
  }, [history]);
  const createNewPen = (event) => {
    if (name) {
      db.collection(`users/${user.id}/pens`).add({
        name,
        code: {
          html: "",
          css: "",
          js: "",
        },
      });
    }
  };
  return (
    <div className="">
      <button onClick={onSignOut}>SignOut</button>
      <h1>All Pens</h1>
      {user.pens
        ? user.pens.map(({ name, id }) => {
            return (
              <Link to={`/${user.id}/pen/${id}`} key={id}>
                {name}
              </Link>
            );
          })
        : null}
      <button onClick={createNewPen}>New Pen</button>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="New Pen Name"
      />
    </div>
  );
};

export default Homepage;
