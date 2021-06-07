import React from "react";
import Routes from "./Routes";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reduxThunk from "redux-thunk";

import reducers from "./src/Reducers";

export default function App() {
  const store = createStore(reducers, applyMiddleware(reduxThunk));
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}
