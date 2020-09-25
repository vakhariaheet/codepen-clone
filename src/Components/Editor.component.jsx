import React, { useState } from "react";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/dracula.css";
import "codemirror/mode/xml/xml";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/css/css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCompress, faCompressAlt } from "@fortawesome/free-solid-svg-icons";
import { Controlled as ControlledEditor } from "react-codemirror2";

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
          mode: lang,
          theme: "dracula",
          lineNumbers: true,
        }}
      />
    </div>
  );
};

export default Editor;
