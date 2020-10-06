import React, { Fragment, useState, useEffect } from "react";
import Editor from "../../Components/Editor/Editor.component";
import { useParams, Link, useHistory } from "react-router-dom";
import { db } from "../../firebase";
import uid from "uid";
import "./EditorPage.styles.scss";

function EditorPage({ user, setUser, setCurrentPath }) {
  const { id } = useParams();
  const [html, setHTML] = useState("");
  const [css, setCSS] = useState(`*,*::after,*::before{
    margin:0;
   padding:0;
   box-sizing:border-box;
  }`);
  const [js, setJS] = useState("");
  const [pen, setPen] = useState({});
  const [srcDoc, setSrcDoc] = useState("");
  const initialCode = {
    html: "",
    css: `*,*::after,*::before{
      margin:0;
     padding:0;
     box-sizing:border-box;
    }`,
    js: "",
  };
  const history = useHistory();
  const onSave = async () => {
    if (!id) {
      const penRef = await db.collection(`users/${user.id}/pens`).add({
        name: uid(),
        code: {
          html,
          css,
          js,
        },
      });
      const newPen = await penRef.get();
      const newUser = user.pens.push({
        id: newPen.id,
        ...newPen.data(),
      });
      history.push(`/${user.id}/pen/${newPen.id}`);

      setUser(newUser);
    } else {
      const pen = await db.doc(`users/${user.id}/pens/${id}`).get();

      setPen({
        id: pen.id,
        ...pen.data,
      });
      await db.doc(`users/${user.id}/pens/${id}`).set({
        ...pen.data(),
        code: {
          html,
          css,
          js,
        },
      });
      alert("Save Successful");
    }
  };
  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
      <html>
      <body>${html}</body>
      <style>${css}</style>
      <script>${js}</script>
      </html>
      `);
      return () => clearTimeout(timeout);
    }, 700);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [html, css, js]);

  useEffect(() => {
    if (user) {
      if (user.id && id) {
        db.doc(`users/${user.id}/pens/${id}`)
          .get()
          .then((snapshot) => {
            const pen = snapshot.data();

            setPen({
              id: pen.id,
              name: pen.name,
              code: pen.code,
            });
            setHTML(pen.code.html);
            setCSS(pen.code.css);
            setJS(pen.code.js);
          });
      }
    } else {
      setHTML(initialCode.html);
      setCSS(initialCode.css);
      setJS(initialCode.js);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Fragment>
      <nav className="nav__editor">
        <div className="nav__editor--left-items">
          <Link
            to={user.id ? "/" : "/signin"}
            className="nav__item--home nav__item"
          >
            <svg id="logo" viewBox="0 0 138 26">
              <path d="M15 8a7 7 0 100 10m7-8.7L33 2l11 7.3v7.4L33 24l-11-7.3zm0 0l11 7.4 11-7.4m0 7.4L33 9.3l-11 7.4M33 2v7.3m0 7.4V24M52 6h5a7 7 0 010 14h-5zm28 0h-9v14h9m-9-7h6m11 1h6a4 4 0 000-8h-6v14m26-14h-9v14h9m-9-7h6m11 7V6l11 14V6"></path>
            </svg>
          </Link>
          {user.id ? (
            <h3 className="nav__item--username nav__item ">
              {user.displayName}:{pen.name}
            </h3>
          ) : null}
        </div>
        <div className="right-items">
          {user.id ? (
            <button onClick={onSave} className="btn save-btn">
              Save
            </button>
          ) : null}
        </div>
      </nav>
      <div className="pane top-pane">
        <Editor displayName="HTML" value={html} onChange={setHTML} lang="xml" />
        <Editor displayName="CSS" value={css} onChange={setCSS} lang="css" />
        <Editor
          displayName="JS"
          value={js}
          onChange={setJS}
          lang="javascript"
        />
      </div>
      <div className="pane output">
        <iframe
          srcDoc={srcDoc}
          title="output"
          className="output"
          sandbox="allow-scripts"
          frameBorder="0"
          width="100%"
          height="100%"
        />
      </div>
    </Fragment>
  );
}

export default EditorPage;
