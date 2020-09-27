import React, { useState } from "react";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/yonce.css";
import "codemirror/mode/xml/xml";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/css/css";
import "codemirror/addon/hint/css-hint";
import "codemirror/addon/hint/html-hint";
import "codemirror/addon/hint/javascript-hint";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";
import "codemirror/addon/hint/show-hint.css";
import "codemirror/addon/hint/show-hint";
import "codemirror/addon/fold/xml-fold";
import "codemirror/addon/fold/foldcode";
import "codemirror/addon/fold/foldgutter";
import "codemirror/addon/fold/brace-fold";
import "codemirror/addon/fold/comment-fold";
import "codemirror/addon/fold/foldgutter.css";
import "codemirror/addon/comment/comment";

import CodeMirror from "codemirror";
import emmet from "@emmetio/codemirror-plugin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCompress, faCompressAlt } from "@fortawesome/free-solid-svg-icons";
import { Controlled as ControlledEditor } from "react-codemirror2";
import "./Editor.styles.scss";
emmet(CodeMirror);
const Editor = (props) => {
  const { displayName, onChange, value, lang } = props;
  const handleChange = (editor, data, value) => {
    onChange(value);
  };
  const [open, setOpen] = useState(true);
  return (
    <div className={`editor-container ${open ? "" : "collapsed"}`}>
      <div className="editor-title">
        {displayName}
        <button
          type="button"
          className="expand-btn"
          onClick={() => setOpen(!open)}
        >
          <FontAwesomeIcon icon={open ? faCompressAlt : faCompress} />
        </button>
      </div>
      <ControlledEditor
        onBeforeChange={handleChange}
        value={value}
        className="code-mirror-wraper"
        options={{
          lineWrapping: true,
          lint: true,
          foldGutter: true,
          mode: lang,
          showHint: true,
          gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
          theme: "yonce",
          autoCloseTags: true,
          autoCloseBrackets: true,
          lineNumbers: true,
          autocorrect: true,
          extraKeys: {
            "Ctrl-Space": "autocomplete",
            Tab: "emmetExpandAbbreviation",
            Enter: "emmetInsertLineBreak",
            "Ctrl-/": "toggleComment",
          },
        }}
      />
    </div>
  );
};

export default Editor;
