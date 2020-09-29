import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
const Signin = ({ user, setUser }) => {
  const [userid, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const onSignin = async (type) => {
    history.push("/");
  };
  const history = useHistory();
  useEffect(() => {
    if (user.userid) {
      history.push("/");
    }
  });
  return (
    <div className="">
      <label htmlFor="userid">
        <input
          type="text"
          name=""
          id="userid"
          className="userid"
          onChange={(e) => setUserId(e.target.value)}
          required
        />
      </label>
      <label htmlFor="password">
        <input
          type="text"
          name=""
          id="password"
          className="userid"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button className="submit" type="submit" onClick={onSignin}>
        Sign IN
      </button>
      <Link to={`/register`}>Dont have a account?</Link>
    </div>
  );
};

export default Signin;
