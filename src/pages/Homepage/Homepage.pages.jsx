import React from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../../firebase";

import { Link } from "react-router-dom";
const Homepage = ({ user, setUser }) => {
  const history = useHistory();
  const onSignOut = () => {
    if (user.id) {
      auth.signOut();
      setUser({});
      history.push("/signin");
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
    </div>
  );
};

export default Homepage;
