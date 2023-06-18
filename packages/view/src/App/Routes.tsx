import { Main } from "../pages/main";
import { DesktopLayout } from "./layouts/desktopLayout";

import { createHashRouter, createBrowserRouter } from "react-router-dom";

// # NOTE
// maybe next time there will be an denpency injetction of creating router.
// now beacuse of it, i can only use this for electron

const router = createHashRouter([
  {
    path: "/",
    element: <DesktopLayout />,
    children: [
      {
        index: true,
        path: "/",
        element: <Main />,
      },
    ],
  },
]);

export default router;
