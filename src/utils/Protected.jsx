import React from "react";
import Cookies from 'universal-cookie';
import { Navigate, Outlet } from "react-router-dom";

const cookies = new Cookies();

function Protected({ component: Component, ...restOfProps }) {
  const isAuthenticated = cookies.get('ddAdminToken');
  return isAuthenticated ? <Outlet/> : <Navigate to="/" />;
}

export default Protected;