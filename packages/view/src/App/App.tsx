import { Routes, Route, Outlet, Link } from "react-router-dom";
import "./../public/style/index.css"
import { Main } from "../pages/main";
import { DesktopLayout } from "../components/shared/layouts/MainLayout/DesktopLayout";
import { Provider } from 'react-redux'
import store from "./Store";

function App() {
    return (
      <Provider store={store}>
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
      </Provider>
    )
  }

export default App;


