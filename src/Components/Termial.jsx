import React from "react";
import Terminal from "terminal-in-react";
const TerminalComponent = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Terminal
        color="green"
        backgroundColor="black"
        barColor="black"
        style={{ fontWeight: "bold", fontSize: "1em" }}
        commands={{
          "open-google": () => window.open("https://www.google.com/", "_blank"),

          popup: () => alert("Terminal in React"),
        }}
        watchConsoleLogging
        descriptions={{
          "open-google": "opens google.com",

          alert: "alert",
          popup: "alert",
        }}
        msg="You can write anything here. Example - Hello! My name is Foo and I like Bar."
      />
    </div>
  );
};

export default TerminalComponent;
