import { Provider } from 'react-redux'
import { RouterProvider } from "react-router-dom";
import "./../public/style/index.css"
import store from "./Store";
import routes from "./Routes";


function App() {
    return (
      <Provider store={store}>
        <RouterProvider router={routes} />
      </Provider>
    )
  }

export default App;


