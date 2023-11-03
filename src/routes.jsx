import React, { Suspense } from "react";
// import DrawerComponent from "./Layout/Drawercomponents";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
// import Dashboard from "./screens/Dashboard";
// import Products from "./screens/Products";
import NewHomePage from "./pages/NewHomePage";
import DrawerComponent from "./Layout/Drawercomponents/index";
function Routes(props) {
  const routerConfig = [
    {
      path: "/",
      element: <DrawerComponent />,
      children: [
        {
          path: "/dashboard",
          element: <NewHomePage />,
        },
      ],
    },
  ];
  const router = createBrowserRouter(routerConfig);

  return (
    <Suspense>
      <RouterProvider router={router}></RouterProvider>
    </Suspense>
  );
}

export default Routes;
