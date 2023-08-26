import React from "react";
import ReactDOM from "react-dom";
import { createRoot } from 'react-dom/client';
import {App, inject, provide} from "@simple-money-manager/view";
import { HashRouter } from "react-router-dom";
import "./index.css"
import { PreloadType } from "@simple-money-manager/process-electron/src/infra/preload/preloadType";

const domNode = document.getElementById("root")
const root = createRoot(domNode as HTMLDivElement);
// inject(window.Electron as PreloadType );
// injectBulk(window.Electron as PreloadType)
// console.log(window.Electron);
const service = provide(window.Electron as PreloadType ?? {})
console.log(service);

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
  
