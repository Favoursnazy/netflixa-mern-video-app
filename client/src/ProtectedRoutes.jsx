import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

//Public Protection
function ProtectedRoutes() {
  const { userInfo } = useSelector((state) => state.userLogin);

  return userInfo?.token ? (
    <>
      <Outlet />
    </>
  ) : (
    <>
      <Navigate to="/login" />
    </>
  );
}

//Admin protected Routes
function AdminProtectedRoutes() {
  const { userInfo } = useSelector((state) => state.userLogin);
  return userInfo?.token ? (
    userInfo?.isAdmin ? (
      <>
        <Outlet />
      </>
    ) : (
      <>
        <Navigate to="*" />
      </>
    )
  ) : (
    <>
      <Navigate to="/login" />
    </>
  );
}

export { ProtectedRoutes, AdminProtectedRoutes };
