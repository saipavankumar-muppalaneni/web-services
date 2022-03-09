import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Protected } from "./ProtectedRoute";
import Signin from "../containers/AuthScreens/Signin";
import Signup from "../containers/AuthScreens/Signup";

import { Private } from "./PrivateRoute";
import Dashboard from "../containers/AppScreens/Dashboard";
import Analytics from "../containers/AppScreens/Analytics";

export default function MainNavigation() {
  return (
    <Routes>

      <Route
        path={"/signin"}
        element={
          <Protected>
            <Signin />
          </Protected>
        }
      />
      <Route
        path={"/signup"}
        element={
          <Protected>
            <Signup />
          </Protected>
        }
      />
      <Route
        index
        element={
          <Private>
            <Dashboard />
          </Private>
        }
      />

    </Routes>
  );
}
