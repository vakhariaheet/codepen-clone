import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
const Homepage = ({ user, setUser }) => {
  const history = useHistory();
  useEffect(() => {
    console.log(process.env.REACT_APP_SERVER_URL, "hello");
    if (!user.userid) {
      history.push("/signin");
    }
  }, []);
  const onSignOut = () => {
    if (user.userid) {
      setUser({});
      history.push("/signin");
    }
  };
  return (
    <div className="">
      <button onClick={onSignOut}>SignOut</button>
      <h1>All Pens</h1>
      {user.pens
        ? user.pens.map(({ name, _id }) => {
            return (
              <Link to={`/${user.userid}/pen/${_id}`} key={_id}>
                {name}
              </Link>
            );
          })
        : null}
    </div>
  );
};

export default Homepage;
