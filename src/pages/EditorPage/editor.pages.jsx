import React, { Fragment, useState, useEffect } from "react";
import Editor from "../../Components/Editor/Editor.component";
import { useParams, useHistory } from "react-router-dom";
import useLocalStorage from "../../hooks/useLocalStorage.hooks";
import "./EditorPage.styles.scss";
function EditorPage({ user }) {
  const { id, userid } = useParams();
  const [html, setHTML] = useLocalStorage(`${userid}-${id}-html`, "");
  const [css, setCSS] = useLocalStorage(`${userid}-${id}-css`, "");
  const [js, setJS] = useLocalStorage(`${userid}-${id}-js`, "");
  const [srcDoc, setSrcDoc] = useState("");
  const history = useHistory();
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
    }, 250);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [html, css, js, user.userid]);
  return (
    <Fragment>
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
