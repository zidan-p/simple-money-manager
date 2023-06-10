import { Routes, Route, Outlet, Link } from "react-router-dom";
import { forwardRef, useEffect, useRef } from "react"
import "./../public/style/index.css"
import { BrowserLayout } from "../components/shared/layouts/MainLayout/BrowserLayout";
import { Main } from "../pages/main";
import { DesktopLayout } from "../components/shared/layouts/MainLayout/DesktopLayout";


function App() {
    return (
      <Routes>
        {/* <Route path="/" element={<MainLayout />}> */}
        <Route path="/" element={<DesktopLayout />}>
            <Route
            index
            path={"/"}
            element={<Main />} 
            /> 
          <Route path="*" element={<h1>no elemennt</h1> } />
        </Route>
      </Routes>
    )
  }

export default App;


