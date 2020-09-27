import React, { Fragment, useState, useEffect } from "react";
import Editor from "../../Components/Editor/Editor.component";
import { useParams, useHistory, Link } from "react-router-dom";
import useLocalStorage from "../../hooks/useLocalStorage.hooks";

import "./EditorPage.styles.scss";

function EditorPage({ user }) {
  const { id, userid } = useParams();
  const [html, setHTML] = useLocalStorage(`${userid}-${id}-html`, "");
  const [css, setCSS] = useLocalStorage(`${userid}-${id}-css`, "");
  const [js, setJS] = useLocalStorage(`${userid}-${id}-js`, "");
  const [pen, setPen] = useState({});
  const [srcDoc, setSrcDoc] = useState("");
  const history = useHistory();
  const onSave = async () => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/update/pen`, {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        name: pen.name,
        id: user._id,
        code: {
          html,
          css,
          js,
        },
      }),
    })
      .then((resp) => resp.json())
      .then((pen) => {
        console.log(pen);
      });
    console.log(pen.name, user, html, css, js);
  };
  useEffect(() => {
    if (!user.userid) {
      history.push("/signin");
    }

    const timeout = setTimeout(() => {
      setSrcDoc(`
      <html>
      <body>${html}</body>
      <style>${css}</style>
      <script>${js}</script>
      </html>
      `);
      return () => clearTimeout(timeout);
    }, 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [html, css, js, user.userid]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/pen?id=${id}`)
      .then((resp) => resp.json())
      .then(({ pens }) => {
        const { code } = pens[0];
        const { html, css, js } = code;
        setHTML(html);
        setCSS(css);
        setJS(js);
        setPen(pens[0]);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Fragment>
      <nav className="navbar">
        <Link to="/">Home</Link>
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
