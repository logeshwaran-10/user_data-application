//Dependencies
import React from "react";
import { Routes, Route } from "react-router-dom";

//Helper
import routes from "./routes";

//component

function AppRouter() {
  return (

      <Routes>
        {routes.map((route) => (
          <Route
            key={route?.path}
            path={route.path}
            element={route.component}
          />
        ))}
      </Routes>
  );
}

export default AppRouter;
