import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
const Homepage = ({ user, setUser }) => {
  const history = useHistory();
  useEffect(() => {
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
      <Link to={`/${user.userid}/pen/123`}>Pen 1</Link>
      <Link to={`/${user.userid}/pen/566`}>Pen 2</Link>
    </div>
  );
};

export default Homepage;
