import React from "react";
import ReactDOM from "react-dom";
import { createRoot } from 'react-dom/client';
import {App} from "@simple-money-manager/view";
import { HashRouter } from "react-router-dom";
import "./index.css"

const domNode = document.getElementById("root")
const root = createRoot(domNode as HTMLDivElement);


root.render(
    <React.StrictMode>
      <HashRouter>
        <App />
      </HashRouter>
    </React.StrictMode>
);
  
