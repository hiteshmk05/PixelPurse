import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import store from './redux/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // need to remove this strict mode isse zayada baar render hota h development ke liye hota h ye
  <React.StrictMode>
  <Provider store={store}>  {/* Wrap your app with Provider */}
    <BrowserRouter>         {/* Wrap your app with BrowserRouter */}
      <App />                {/* Your main App component */}
    </BrowserRouter>
  </Provider>
</React.StrictMode>,
);
