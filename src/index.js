import React from "react";
import ReactDOM from "react-dom";
import thunk from "redux-thunk";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import App from "./App";
import "./index.scss";
import reducers from "./reducers/index.js";
import { getCurrentUser } from "./actions/index.js";

//const ext = window.__REDUX_DEVTOOLS_EXTENSION__;
//const devtoolMiddleware = ext && ext();

const store = createStore(
  reducers,
  compose(applyMiddleware(thunk))
);

store.dispatch(getCurrentUser());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
