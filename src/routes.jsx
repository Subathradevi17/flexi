import React, { Suspense } from "react";
// import DrawerComponent from "./Layout/Drawercomponents";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
// import Dashboard from "./screens/Dashboard";
// import Products from "./screens/Products";
import NewHomePage from "./pages/NewHomePage";
import DrawerComponent from "./Layout/Drawercomponents/index";
import fieldData from "./utils/fields.json";
function Routes(props) {
  const routerConfig = [
    {
      path: "/",
      element: <DrawerComponent />,
      children: Object.keys(fieldData).map((sectionName) => ({
        path: `/${sectionName.toLowerCase()}`,
        element: <NewHomePage sectionName={sectionName} />,
      })),
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
