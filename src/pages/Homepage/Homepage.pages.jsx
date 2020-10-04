import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../../firebase";
import { db } from "../../firebase";
import { Link } from "react-router-dom";
import "./Homepage.styles.scss";
const Homepage = ({
  user,
  setUser,
  isUserSignin,
  setIsUserSignin,
  setCurrentPath,
}) => {
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
  const onDelete = async (id) => {
    await db.doc(`users/${user.id}/pens/${id}`).delete();
  };
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
    setName("");
  };
  useEffect(() => {
    if (!user) {
      history.push("/signin");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="">
      <nav className="nav__homepage">
        <svg id="logo" className="nav__signin--logo" viewBox="0 0 138 26">
          <path d="M15 8a7 7 0 100 10m7-8.7L33 2l11 7.3v7.4L33 24l-11-7.3zm0 0l11 7.4 11-7.4m0 7.4L33 9.3l-11 7.4M33 2v7.3m0 7.4V24M52 6h5a7 7 0 010 14h-5zm28 0h-9v14h9m-9-7h6m11 1h6a4 4 0 000-8h-6v14m26-14h-9v14h9m-9-7h6m11 7V6l11 14V6"></path>
        </svg>
        <button onClick={onSignOut} className="nav__homepage--btn">
          SignOut
        </button>
      </nav>
      <div className="homepage__container">
        <h1 className="heading">All Pens</h1>
        <div className="createPen__container">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyPress={(e) => (e.key === "Enter" ? createNewPen() : null)}
            placeholder="New Pen Name"
            className="createPen-input"
          />
          <button onClick={createNewPen} className="createPen-input--btn">
            New Pen
          </button>
        </div>

        {user.pens ? (
          user.pens.length > 0 ? (
            <div className="pen__container">
              {user.pens
                ? user.pens.map(({ name, id }) => {
                    return (
                      <div className="pen" key={id}>
                        <Link
                          to={`/${user.id}/pen/${id}`}
                          key={`link-${id}`}
                          className="pen__text"
                        >
                          {name}
                        </Link>
                        <button
                          key={`btn-${id}`}
                          className="pen__btn"
                          onClick={() => onDelete(id)}
                        >
                          DELETE
                        </button>
                      </div>
                    );
                  })
                : null}
            </div>
          ) : null
        ) : null}
      </div>
    </div>
  );
};

export default Homepage;
