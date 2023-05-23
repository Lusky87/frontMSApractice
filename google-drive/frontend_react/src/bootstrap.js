import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { render, unmountComponentAtNode } from 'react-dom';
// import {BrowserRouter, createBrowserRouter, HashRouter} from 'react-router-dom';
import {HashRouter} from 'react-router-dom';
// import reportWebVitals from './reportWebVitals';
const axios = require("axios").default;
// backend host url
// axios.backend = "http://localhost:8088";
axios.backend = null;

// axios.backendUrl = new URL(axios.backend);
axios.fixUrl = function(original) {

  if(!axios.backend && original.indexOf("/")===0) return original;
  let url = null;
  try {
    url = new URL(original);
  }catch(e){
    url = new URL(axios.backend + original);
  }

  if(!axios.backend) return url.pathname;

  url.hostname = axios.backendUrl.hostname;
  url.port = axios.backendUrl.port;

  return url.href;
}
import ('./web-components');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/*<BrowserRouter>
      <App />
    </BrowserRouter>*/}
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

