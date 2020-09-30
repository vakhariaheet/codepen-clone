import React, { Fragment, useState, useEffect } from "react";
import Editor from "../../Components/Editor/Editor.component";
import { useParams, Link } from "react-router-dom";
import { db } from "../../firebase";
import useLocalStorage from "../../hooks/useLocalStorage.hooks";
import "./EditorPage.styles.scss";

function EditorPage({ user }) {
  const { id, userid } = useParams();
  const [html, setHTML] = useLocalStorage(`${userid}-${id}-html`, "");
  const [css, setCSS] = useLocalStorage(`${userid}-${id}-css`, "");
  const [js, setJS] = useLocalStorage(`${userid}-${id}-js`, "");
  const [pen, setPen] = useState({});
  const [srcDoc, setSrcDoc] = useState("");
  const initialCode = {
    html: "",
    css: "",
    js: "",
  };
  const onSave = async () => {
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
    // console.log(pen);
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
    if (user.id) {
      db.doc(`users/${user.id}/pens/${id}`)
        .get()
        .then((snapshot) => {
          const { code } = snapshot.data();
          setHTML(code.html);
          setCSS(code.css);
          setJS(code.js);
          console.log(code);
        });
    } else {
      console.log("Initial code");
      setHTML(initialCode.html);
      setCSS(initialCode.css);
      setJS(initialCode.js);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Fragment>
      <nav className="navbar">
        <Link to="/">Home</Link>
        <h1>{pen.name}</h1>
        <button onClick={onSave}>Save</button>
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
      <div className="pane">
        <iframe
          srcDoc={srcDoc}
          title="output"
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
