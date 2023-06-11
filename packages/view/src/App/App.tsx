import "./../public/style/index.css"
import { Provider } from 'react-redux'
import store from "./Store";
import { RouterProvider } from "react-router-dom";
import routes from "./Routes";


function App() {
    return (
      <Provider store={store}>
        <RouterProvider router={routes} />
      </Provider>
    )
  }

export default App;


