import { Routes, Route, Outlet, Link } from "react-router-dom";
import { forwardRef, useEffect, useRef } from "react"
import "./public/style/index.css"
import { MainLayout } from "./layouts/MainLayout";
import { Main } from "./pages/main";

function App() {
    return (
      <Routes>
        <Route path="/" element={<MainLayout />}>
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


