import { StrictMode } from "react";
import reactDom from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import "./index.css";
import store from "./reduxslice/store";

const rootEl = document.querySelector("#root");

reactDom.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,

  rootEl
);
