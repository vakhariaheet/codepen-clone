import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { db } from "../../firebase";
import { Link } from "react-router-dom";
const Homepage = ({ user, setUser }) => {
  const [currentUser, setCurrentUser] = useState({});
  const history = useHistory();

  useEffect(() => {
    console.log(user);
    setCurrentUser(user);
  }, []);
  const onSignOut = () => {
    if (user.userid) {
      setUser({});
      history.push("/signin");
    }
    history.push("/signin");
  };
  return (
    <div className="">
      <button onClick={onSignOut}>SignOut</button>
      <h1>All Pens</h1>
      {currentUser.pens
        ? currentUser.pens.map(({ name, id }) => {
            return (
              <Link to={`/${user.userid}/pen/${id}`} key={id}>
                {name}
              </Link>
            );
          })
        : null}
    </div>
  );
};

export default Homepage;
