import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
const Form = ({ user, onSumit, setUserId, setPassword, btnText, to }) => {
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
      <button className="submit" type="submit" onClick={onSumit}>
        {btnText}
      </button>
      <Link to={`/${to}`}>Want to {to}</Link>
    </div>
  );
};

export default Form;
