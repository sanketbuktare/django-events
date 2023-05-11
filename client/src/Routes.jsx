import { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import {AppContext} from "./contexts/AppContext";

import Profile from "./components/pages/Profile";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import MyFavorites from "./components/pages/MyFavorites";
import AllEvents from "./components/pages/AllEvents";

const PrivateRoute = (props) => {
  const { isLoggedIn } = useContext(AppContext);
  if (isLoggedIn) {
    return props.children;
  }
  return <Navigate to="/" />;
};

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<AllEvents />} />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/my-favorites"
          element={
            <PrivateRoute>
              <MyFavorites />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
};

export default AppRoutes;
