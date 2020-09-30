import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  signinWithGoogle,
  signinWithFacebook,
  signinWithTwitter,
  signinWithGithub,
} from "../../firebase";
import "./Signin.styles.scss";
const Signin = ({ user, setUser }) => {
  const history = useHistory();
  useEffect(() => {
    if (user.userid) {
      history.push("/");
    }
  });

  return (
    <div className="signin">
      <div className="signin__form">
        <h1 className="signin__heading">Sign In</h1>
        <button
          className="signin__btn--google signin__btn"
          type="submit"
          onClick={signinWithTwitter}
        >
          Twitter
        </button>{" "}
        <button
          className="signin__btn--google signin__btn"
          type="submit"
          onClick={signinWithGithub}
        >
          Github
        </button>{" "}
        <button
          className="signin__btn--google signin__btn"
          type="submit"
          onClick={signinWithFacebook}
        >
          Facebook
        </button>
        <button
          className="signin__btn--google signin__btn"
          type="submit"
          onClick={signinWithGoogle}
        >
          Google
        </button>
      </div>
    </div>
  );
};

export default Signin;
