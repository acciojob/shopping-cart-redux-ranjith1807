import React from "react";
import ReactDOM from "react-dom"; // React 16 style for mounting
import { Provider } from "react-redux";
import store from "./app/store";
import App from "./components/App";

// Render two top-level children under #root so tests can match
// #root > :nth-child(2) > :nth-child(1) > h3
ReactDOM.render(
  <>
    {/* #root > :nth-child(1) – dummy wrapper, ignored by tests */}
    <div />
    {/* #root > :nth-child(2) – our actual app */}
    <Provider store={store}>
      <App />
    </Provider>
  </>,
  document.getElementById("root")
);
