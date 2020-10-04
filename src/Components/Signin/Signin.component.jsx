import React, { useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import {
  signinWithGoogle,
  signinWithFacebook,
  signinWithTwitter,
  signinWithGithub,
} from "../../firebase";
import "./Signin.styles.scss";
const Signin = ({ isUserSignin, setIsLoading }) => {
  const history = useHistory();
  useEffect(() => {
    if (isUserSignin) {
      history.push("/");
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  });
  const onBtnClick = (authFunc) => {
    console.log("btn clicked");

    authFunc();
    setIsLoading(true);
  };
  const onNewPen = () => {
    alert(
      "Are u sure bcoz none of your work would be save? (Plz Sigin First to save Pen)"
    );
  };
  return (
    <div className="signin">
      <nav className="nav__signin">
        <Link to="/signin">
          <svg id="logo" className="nav__signin--logo" viewBox="0 0 138 26">
            <path d="M15 8a7 7 0 100 10m7-8.7L33 2l11 7.3v7.4L33 24l-11-7.3zm0 0l11 7.4 11-7.4m0 7.4L33 9.3l-11 7.4M33 2v7.3m0 7.4V24M52 6h5a7 7 0 010 14h-5zm28 0h-9v14h9m-9-7h6m11 1h6a4 4 0 000-8h-6v14m26-14h-9v14h9m-9-7h6m11 7V6l11 14V6"></path>
          </svg>
        </Link>
        <Link className="nav__signin--newPen" to="/newPen" onClick={onNewPen}>
          New Pen
        </Link>
      </nav>
      <div className="signin__form--container">
        <div className="signin__form">
          <h1 className="signin__heading">Sign In</h1>
          <button
            className="signin__btn--twitter signin__btn"
            type="submit"
            onClick={() => onBtnClick(signinWithTwitter)}
          >
            Twitter
          </button>{" "}
          <button
            className="signin__btn--github signin__btn"
            type="submit"
            onClick={() => onBtnClick(signinWithGithub)}
          >
            Github
          </button>{" "}
          <button
            className="signin__btn--facebook signin__btn"
            type="submit"
            onClick={() => onBtnClick(signinWithFacebook)}
          >
            Facebook
          </button>
          <button
            className="signin__btn--google signin__btn"
            type="submit"
            onClick={() => onBtnClick(signinWithGoogle)}
          >
            Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signin;
