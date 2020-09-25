import React, { Fragment, useState, useEffect } from "react";
import Editor from "./Components/Editor.component";
import useLocalStorage from "./hooks/useLocalStorage.hooks";
function App() {
  const [html, setHTML] = useLocalStorage("html", "");
  const [css, setCSS] = useLocalStorage("css", "");
  const [js, setJS] = useLocalStorage("js", "");
  const [srcDoc, setSrcDoc] = useState("");
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
    }, 250);
  }, [html, css, js]);
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

export default App;
